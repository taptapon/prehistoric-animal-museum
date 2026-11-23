# mac-h 部署登记：博物馆公网入口（Cloudflare Tunnel）

> 唯一权威登记（机器层 `MACHINE.md` 只留 Label 清单指针）。装机归属：仅 mac-h。
> 建成：2026-11-23。链路与参数由本文唯一登记，改隧道 / 端口 / 域名先改本文。

## 链路

```
浏览器
  → https://museum.jasonteam.top        （CF 边缘，Access 邮箱 OTP 门禁）
  → Cloudflare Tunnel "museum"          （UUID f57ffbdf-3662-4f2d-92ac-23838d3d53d0，protocol http2）
  → http://127.0.0.1:8790               （仓内 server.mjs 静态服务 dist/）
```

- 隧道配置：`~/.cloudflared/museum.yml`（ingress museum.jasonteam.top → 127.0.0.1:8790，兜底 404）
- 隧道凭据：`~/.cloudflared/f57ffbdf-3662-4f2d-92ac-23838d3d53d0.json`（含密钥勿外泄）
- 门禁：Cloudflare Access（Zero Trust 控制台配置，本机零密钥）；2026-11-23 实测已生效——匿名访问 302 → `fragrant-tree-1237.cloudflareaccess.com` 登录页

## 内网直连入口（Caddy，2026-11-23 加；同域名双路，在家快出门照旧）

与 kidslearn / stock 共用同一台 Caddy（机器层基建：本体 / 证书 / 路由器 hosts 管理规约唯一登记 = mac-h `MACHINE.md`「内网直连入口」节），本节只登记 museum 自己那一块。

```
在家：museum.jasonteam.top →（路由器 DNS）→ 192.168.31.172:443 Caddy → 127.0.0.1:8790
出门：museum.jasonteam.top → CF 边缘 → cloudflared 隧道 → 127.0.0.1:8790
```

- **Caddyfile 第四站点块**：`~/etc/caddy/Caddyfile` 里 `museum.jasonteam.top`（bind 192.168.31.172，DNS-01 证书独立签发，reverse_proxy 127.0.0.1:8790，`header_up X-Entry-Via lan`）。2026-11-23 实测：证书 LE（至 2027-02-20）、首页 200 ~32ms。
- **内网路无 Access 门禁**（同 stock 口径：家庭 WiFi 可信，在家省 OTP）；出门走 CF 隧道照旧 OTP。
- **路由器侧**：小米路由自定义 hosts 增第三行 `192.168.31.172 museum.jasonteam.top`（精确匹配，必须写完整子域；该路由重启有丢配置前科，动/重启后与静态绑定一并复核）。
- **验证**：`curl --resolve museum.jasonteam.top:443:192.168.31.172 https://museum.jasonteam.top/` → 200。
- **前端入口徽标**（2026-11-23 加）：页头小徽标双语显示「内网直连 / 公网访问」；判定 = 同源 HEAD 探测响应头 `cf-ray` 有无（CF 边缘签名，内网 Caddy 给不出）→ 有 = 公网；探测失败（如 Access 会话过期被跨源重定向）按公网兜底。非 jasonteam.top 域（本地评审 / e2e / prerender）不渲染。实现 = `src/components/{entry-detection.ts,EntryBadge.tsx}`，测试 `tests/entry-detection.test.ts`。
- **回滚（仅内网入口下线）**：删 `~/etc/caddy/Caddyfile` 的 museum 块 + `sudo launchctl kickstart -k system/com.jianghong.caddy`（改前备份 `~/etc/caddy/Caddyfile.bak-20261123-museum`）；可选删路由器 hosts 行。公网隧道入口完全独立，不受影响。

## LaunchAgent（`~/Library/LaunchAgents/`，均 KeepAlive ThrottleInterval=10）

| Label | 进程 | 日志 |
| --- | --- | --- |
| `com.jianghong.museum.webapp` | `~/.local/bin/node server.mjs dist --port 8790 --host 127.0.0.1 --cache-hashed-assets`（WorkingDirectory = 仓根） | `~/.local/share/museum-mach/webapp.log` |
| `com.jianghong.museum.cloudflared` | `cloudflared tunnel --config ~/.cloudflared/museum.yml run f57ffbdf-…` | `~/.local/share/museum-mach/cloudflared.log` |

## 内容更新流程

仓内 `npm run build` 重建 `dist/` 即完成发布——server.mjs 每请求读盘，公网**即时生效**，无需重启任何 LaunchAgent。构建即完整发布门禁（validate + tsc + build + 边界扫描）。

## 验通

```sh
curl -sI http://127.0.0.1:8790/                # 期望 HTTP/1.1 200
curl -sI https://museum.jasonteam.top/         # Access 前期望 200；Access 后期望 302 → *.cloudflareaccess.com
cloudflared --config ~/.cloudflared/museum.yml tunnel info f57ffbdf-3662-4f2d-92ac-23838d3d53d0
# 期望活跃 edge 连接（http2，本机家宽下约 4 条）
```

## 已知坑（实测记录）

1. **`--config` 必带，且不止 run 子命令**：cloudflared 默认读 `~/.cloudflared/config.yml`（kidslearn），不带会把隧道解析劫持到 kidslearn。2026-11-23 实测：`tunnel route dns` 子命令同样被劫持，首次 route 曾把 CNAME 挂到 kidslearn 隧道，靠 `--overwrite-dns` 修正。
2. **protocol http2 必写**：家宽对 UDP/QUIC 限速丢包（2026-11-22 stock/kidslearn 双隧道实测），不写则每 20~40 分钟掉线重连。
3. **ingress service 必须写显式 `127.0.0.1:8790`**：裸端口会先拨 ::1 被拒（"failed to open private leg"）。
4. **webapp 必带 `--cache-hashed-assets`**：server.mjs 默认全量 `no-store`，公网访客会穿透家宽上行拉 GLB/音频；开启后哈希资源 immutable + CF 边缘缓存（实测 MISS → HIT）。

## 回滚

```sh
launchctl bootout gui/$(id -u)/com.jianghong.museum.cloudflared
launchctl bootout gui/$(id -u)/com.jianghong.museum.webapp
rm ~/Library/LaunchAgents/com.jianghong.museum.{cloudflared,webapp}.plist
rm ~/.cloudflared/museum.yml
cloudflared tunnel delete museum          # 删隧道 + 吊销凭据
# CF 控制台 DNS 手动删 museum.jasonteam.top 的 CNAME（CLI 无删除 route 命令）
```

仓库内容（dist、server.mjs）零改动，无需回退。恢复 = 重新 `tunnel create museum` + route dns + bootstrap 两个 plist。
