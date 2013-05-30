---
layout: blog
title: 'Networking: Apple AirPort Extreme and Linksys WRT54GL'
category: nerd
---
I've been trying to get these routers to talk to each other for a while. I have my desktop computer sitting on the other side of the WRT54GL so I need to use it as a wireless receiver. I'm using the generally awesome [Tomato Firmware][1] for the job but the settings should follow for any router in that family with any custom firmware. I searched the internet high and low on how to set this up with security and through much trial and error found a workable solution. I didn't find it explicitly stated anywhere so I'm going to lay out my findings.

- Apple's AirPort Extreme will not do WDS with a non-Apple router.
- WRT54GL (and co.) don't support AES encryption as a client (WDS, Wireless Client, Wireless Ethernet Bridge) so you must set it to use TKIP encryption in these modes.



###The AirPort Extreme setup:
- **Wireless**: create Wireless Network
- **Security**: WPA/WPA2 Personal
- **Wireless Options**: 2.4GHz Channel: Explicitly choose an unused 2.4GHz channel with as big a buffer as possible between the next active channels. Use a wireless survey tool to figure this out.
- Take note of the DHCP Range in the Network tab (`192.168.xxx.xxx`, `10.0.xxx.xxx`, etc.)

###The WRT54GL setup (Basic -> Network):

- **Wireless Mode**: Wireless Ethernet Bridge (this makes the router transparent to the connected clients i.e. they think they are talking to the AirPort Extreme)
- **SSID**: same as AirPort Extreme
- **Security**: WPA Personal
- **Encryption**: TKIP
- **Shared Key**: same as AirPort Extreme
- **Router IP Address**: choose an unused IP outside the AirPort Extreme DHCP Range but in the subnet. My AirPort Extreme is `192.168.1.1` with DHCP Range `192.168.1.100`-`192.168.1.149` and I set the IP to `192.168.1.2`. Keeping this value in your network allows you to access the configuration when your computer has a DHCP address from the AirPort Extreme.
- **Subnet Mask**: same as AirPort Extreme (`255.255.255.0`)

That's it. It took me a frustratingly long time to figure out that you have to use WPA Personal and TKIP so I hope this saves someone else some time.

[1]: http://www.polarcloud.com/tomato