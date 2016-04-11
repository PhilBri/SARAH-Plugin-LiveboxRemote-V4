# LiveboxRemote
<img src="../master/www/images/Capture.PNG" width="20%" height="20%"/>

#LiveboxRemote

### Manage your Livebox (by Orange) with SARAH.

***

This plugin is an add-on for the framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h) an Home Automation project.
* [Description](#description)
* [Installation](#install)
* [Accés](#access)
* [Important](#important)


***
<a name="description"></a>
## Description

Retrouvez votre télécommande *Livebox* dans l'écran de SARAH.

Utilisez les touches ou commandez l'ensemble par la voix...

***

<a name="install"></a>
## Installation

Utilisez le **MarketPlace** en-ligne, ou télécharger directement le plugin depuis cette page et, copiez les fichiers dans le répertoire `..\SARAH\plugins\MQTTHub`

***

<a name="access"></a>
## Accés

Ce plugin peut-être commandé via http via le script suivant :
- `http://127.0.0.1:8080/sarah/LiveboxRemote/?cmd=myCmd`
- `myCmd` étant une des commandes disponibles dans le fichier `\plugin\TvProg\node_modules\ipCmd.js`

Un exemple concret :
- Utilisation du plugin *TvProg* qui permet de demander d'afficher une chaine TV...



<a name="important"></a>
## Important notes

**Compatible versions:** 

- This plugin was designed for **S.A.R.A.H** v4 only !...