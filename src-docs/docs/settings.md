![META](authors:Nicolas "Duduf" Dufresne;license:GNU-FDL;copyright:2021;updated:2021/07/30)

# ![](img/icons/settings.svg){: style="width:32px;"} DuGR Settings

You can access the settings panel with the ![](img/icons/settings.svg){: style="width:20px;"} wrench icon on the bottom line of the panel.

![](img/settings.png)

## Common settings

The upper part of the panel contains common settings which are the same across all *Duduf/RxLab* scripts.

- Use the ![](img/icons/language.svg){: style="width:20px;"} ***Language*** button to change the language of the script.
- Use the ![](img/icons/settings_file.svg){: style="width:20px;"} ***Settings file*** button to change the location where are stored these settings. You can use the settings file to easily move the settings to another workstation, or to sync it using an app like [*Syncthing*](https://syncthing.net/).
- The ***Color menu*** allows you to change the highlight color of the script.
- The ***UI Mode*** menu allows you to choose between three modes:
    - ![](img/icons/rookie.svg){: style="width:20px;"} ***Rookie*** is a mode where there are more texts, which makes the script easier to understand and to use to get started quickly, but the user interface takes more room.
    - ![](img/icons/standard.svg){: style="width:20px;"} ***Standard*** is the recommended mode if you already know how to use the script. Some texts are hidden and replaced by icons, which makes the UI smaller and less intrusive.
    - ![](img/icons/expert.svg){: style="width:20px;"} ***Expert*** is the mode you can use if you prefer a very small UI, wihout any text and just icons.
- The ![](img/icons/user.svg){: style="width:20px;"} ***Normal mode*** and ![](img/icons/bug.svg){: style="width:20px;"} ***Dev & Debug mode*** switch should always stay on *Normal mode* unless: you've found a bug, and in this case errors shown by the *Debug mode* can help us tackle it down, or you're working on the development of the script and you need some debug information.

## DuGR settings

The second part of the panel contains *DuGR* specific settings.

- ![](img/icons/enabled.png) You can hide the After Effects layer switches if you don't need them and need more room. These switches are these buttons on the top of the panel:  
  ![](img/ae_switches.png)
- ![](img/icons/lock.svg){: style="width:20px;"} You can choose to ***allow*** or ***deny changes*** to locked layers.
- *DuGR* creates a semi-transparent red frame around the composition to let you know your in isolation mode. You can choose its placement:
    - ![](img/icons/no_frame.svg){: style="width:20px;"} ***No Frame*** at all.
    - ![](img/icons/frame_above.svg){: style="width:20px;"} ***Frame Above*** all layers.
    - ![](img/icons/frame_below.svg){: style="width:20px;"} ***Frame Below*** all layers.
- You can choose how layers must be hidden:
    - ![](img/icons/wireframe.svg){: style="width:20px;"} ***Wireframe*** will replace layers by a bounding box and a cross.
    - ![](img/icons/hide.svg){: style="width:20px;"} Or you can just ***hide*** them.
- You can hide or show the markers (tags) from the layer:
    - ![](img/icons/tag.svg){: style="width:20px;"} ***Show tags***.
    - ![](img/icons/no_tag.svg){: style="width:20px;"} ***Hide tags***.
- ![](img/icons/select.svg){: style="width:20px;"} You can automatically select the layers in After Effects when you select a group in DuGR.
- ![](img/icons/lock_hidden.svg){: style="width:20px;"} You can choose to either automatically lock the layers which are hidden, or leave them as they are.

## Other

- The ![](img/icons/download.svg){: style="width:20px;"} ***Check for updates*** button will check online if a new version of *DuGR* is available for you to download.