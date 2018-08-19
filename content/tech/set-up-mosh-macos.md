---
Title: Set Up Mosh on macOS
Subtitle: "TL;DR: brew install, firewall, pfctl, have a nice day!"
Date: 2017-06-29 08:10
Tags: [macos, sysadmin]
---

Last night I bumped back into [Mosh] (by way of [this post]), and decided to give it a whirl -- I had seen it before, and in fact had even installed it, but had never gotten around to giving it a try.

[Mosh]: https://mosh.org
[this post]: https://medium.com/@searls/giving-the-ipad-a-full-time-job-3ae2440e1810

If you're not familiar with Mosh, it's like SSH: a remote (terminal) connection to another machine. Unlike SSH, though, a single session can survive disconnects: it sets up a small server on the host machine and will reestablish the connection if it drops. It also responds immediately when you're typing, even if there's serious lag to the other server -- it just gives you a nice visual signal (underlining) to let you know the other side hasn't received what you've typed. This seems pretty nice, so I thought I'd set it up on my iMac so I could hit it from my iPad.

This isn't complicated, but it also isn't well-documented after the first step!

## Steps

1. Install mosh.

    - via the [binary] on their site
    - by running `brew install mosh`
    
2. Find the install location for the server from your Terminal:
    
    ```sh
    $ which mosh-server
    ```

3. Configure the firewall to allow the mosh server to install connections.

    1. Open the **Security and Privacy** pane of the **System Preferences** app.
    2. Choose the **Firewall** tab. Unlock it to make changes.
    3. Click **Firewall Options**.
    4. On the pane that opens, click the **+** button to add a new rule.
    5. Navigate to the location you got in step 2 above. (One easy way to do this: hit <kbd>⌘ Cmd</kbd><kbd>⇧ Shift</kbd><kbd>G</kbd>, and paste in the output from the `which` command.) Click **Add**.
    6. Find "mosh-server" in the list, and set it to **Allow incoming connections**.
    7. Hit **OK**.

4. Persuade macOS to reload its firewall rules. (This *may* not be necessary, but it was for me.) You can do one of the following:

    - restart your machine
    - reload the normal rules manually:
        
        ```sh
        $ sudo pfctl -f /etc/pf.conf
        ```

5. You may also need to open these ports on your router firewall. You should consider carefully whether you want a bunch of open ports sitting there or whether you want to just use a specific port and then always target that specific port by running mosh with the `-p` option:

    ```sh
    $ mosh -p 60000 some-user@some-host.example.com
    ```

    If you can connect locally but not remotely, this is probably what you need!

That should be all you need!

[binary]: https://mosh.org/#getting
