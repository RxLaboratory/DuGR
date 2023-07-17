![META](authors:Nicolas "Duduf" Dufresne;license:GNU-FDL;copyright:2021-2022;updated:2022/09/28)

# Install DuGR

## Supported versions of After Effects 

**DuGR is always tested and works with the most recent release and beta versions of After Effects**, on all platforms compatible with After Effects.

It should also work with previous versions back to *After Effects CC (12.x)*.

It does not work on *After Effects CS6 (11.x)* and earlier versions.

## Installation

### **1 - Download** DuGR from the [official website](https://rxlaboratory.org/en/tools/dugr/).

### **2 - Unzip** the files you have downloaded.

You'll find several folders and files.

- *README.txt* contains a lot of information to help you get started with DuGR.
- The *Help* folder contains these help pages. Double click on the file *index.html* to open it.
- The *Tools* folder may contain some useful tools.
- The *ScriptUI Panels* folder contains the actual *DuGR* script you need to install.  
- The *Scriptlets* folder contains small scripts you can assign to [keyboard shortcuts](#keyboard-shortcuts) for example.

### **3 - Install**

You can choose one of these three options to use DuGR:

- Manually **copy the files** to the main ScriptUI Panels.
  For this to work, you need to have administrator rights on the computer. DuGR will be available to all users.
- **Install from within After Effects**.
  You don't need administrator rights this  way, but DuGR will be available only for the current user.
- You can also **use DuGR without installation**.
  DuGR will not be dockable into the After Effects workspace, it will be a floating panel.

#### Copy the files

- **Copy** the files of your choice from the *ScriptUI Panels* folder to:
    - Windows: `C:/Program Files/Adobe/Adobe After Effects XXXX/Support Files/Scripts/ScriptUI Panels/`  
    - Mac OS: `/Applications/Adobe After Effects XXXX/Scripts/ScriptUI Panels`

You'll need administrator privileges to install DuGR this way. If you don't have them, see the other ways below.

- **Restart** After Effects

#### Install from within After Effects

- **Open** After Effects
- Use the `File > Scritps > Install ScriptUI Panel...` **menu** to select and install the panels of your choice from the *ScriptUI Panels* folder.
- **Restart** After Effects

#### Use without installing

You'll always be able to run DuGR without even installing it.

- **Open** After Effects
- Use the `File> Scritps > Run script file...` **menu** to select and run the panel of your choice from the *ScriptUI Panels* folder.

### **4 - First Run**

#### File and network access

On first run, DuGR may first ask for file and network access, this is mandatory to make it work[^1].

![](img/dugr/install/file_network_access.png)

If you see this window, click on *Open preferences*. This opens After Effects scripting preferences.

![](img/ae/file_network_access.png)

Check the box called *Allow Scripts to Write Files and Access Network*, then click the *OK* button.

#### Select language

By default, the language is set to [*Esperanto*](https://en.wikipedia.org/wiki/Esperanto)[^2].

![](img/dugr/install/language.png)

Select the language of your choice and click the *Apply* button.

## Keyboard shortcuts

DuGR comes with a few *scriptlets* which can be used as keyboard shortcuts. These scriptlets are in the *Scriptlets* folder in the zip you've downloaded.

To test one of these scriptlets, use the `File > Scritps > Run script file...` menu entry in After Effects.

- To permanently install any of these scriptlets and be able to assign them keyboard shortcuts, use the `File > Scritps > Install script file...` menu entry. Be careful, you'll need to install the `DuGR_api.jsxinc` file along with them, and to be able to select it you may have to adjust the file type filter of the file selection dialog.

- Then, restart After Effects

- You can now assign keyboard shortcuts to these scripts, using the `Edit > Keyboard shortcuts...` menu entry.

!!! warning
    If the scriplets don't work correctly after installation, make sure you have also installed the `DuGR_api.jsxinc` file.

[^1]: DuGR needs this option in order to be able to:  
    • Write the images and icons it needs to the disk.  
    • Access the network to check for updates. DuGR only accesses `http://api.rxlab.io` and does not share any personal data.

[^2]: *Esperanto* is the world's most widely spoken constructed international auxiliary language. Created by Warsaw-based ophthalmologist L. L. Zamenhof in 1887, it was intended to be a universal second language for international communication, or "the international language" (la lingvo internacia).  
    Read more on Wikipedia: [en.wikipedia.org/wiki/Esperanto](https://en.wikipedia.org/wiki/Esperanto)