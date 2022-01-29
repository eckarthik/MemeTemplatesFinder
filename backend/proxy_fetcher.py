from hideme.proxy_collector import ProxiesList
proxies_list = ProxiesList(https=True)
proxies = proxies_list.get()
print(proxies)