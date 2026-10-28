"""
礼品项目本地 Web 服务器
功能：
1. 本地零依赖 HTTP 服务，支持浏览器直接使用全部功能
2. 自动开启浏览器访问 http://127.0.0.1:8085
3. 支持局域网设备/手机共享访问
"""
import http.server
import socketserver
import socket
import webbrowser
import os
import sys
import threading
import time

PORT = 8085

def get_lan_ips():
    ips = []
    try:
        host_info = socket.gethostbyname_ex(socket.gethostname())
        for ip in host_info[2]:
            if not ip.startswith('127.'):
                ips.append(ip)
    except Exception:
        pass
    
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        default_ip = s.getsockname()[0]
        s.close()
        if default_ip not in ips and not default_ip.startswith('127.'):
            ips.insert(0, default_ip)
    except Exception:
        pass
        
    return ips if ips else ['127.0.0.1']

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        curr_dir = os.path.dirname(os.path.abspath(__file__))
        super().__init__(*args, directory=curr_dir, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def open_browser(port):
    time.sleep(1.0)
    url = f"http://127.0.0.1:{port}"
    print(f"\n[🚀 浏览器自动开启] 正在打开 {url} ...")
    webbrowser.open(url)

def main():
    global PORT
    curr_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(curr_dir)

    server = None
    for p in range(PORT, PORT + 20):
        try:
            socketserver.TCPServer.allow_reuse_address = True
            server = socketserver.TCPServer(("", p), CustomHandler)
            PORT = p
            break
        except OSError:
            continue

    if not server:
        print("❌ 无法绑定端口，请检查网络占用。")
        sys.exit(1)

    lan_ips = get_lan_ips()
    primary_ip = lan_ips[0]

    print("=" * 60)
    print("🎁 礼品中心 - 礼品选择与营销宣传图智能工坊")
    print("=" * 60)
    print(f"👉 本地访问地址: http://127.0.0.1:{PORT}")
    print(f"👉 局域网访问地址: http://{primary_ip}:{PORT}")
    print("=" * 60)
    print("💡 提示：按 Ctrl + C 可随时退出服务器。")

    # 启动后台线程打开浏览器
    threading.Thread(target=open_browser, args=(PORT,), daemon=True).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n正在停止服务...")
    finally:
        server.server_close()
        print("服务已停止。")

if __name__ == '__main__':
    main()
