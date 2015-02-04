/*
	

Dugr / Duduf Groups for After Effects
Copyright (c) 2011 Nicolas Dufresne
http://www.duduf.net



This file is part of Dugr.

     Dugr is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

     Dugr is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with  Dugr. If not, see <http://www.gnu.org/licenses/>.
*/	

	//================
	var version = "1.2";
	//================

function dugr(thisObj) {

//===============
//FONCTIONS
//===============
//fonction déselectionner
function aucuneSelection() {
			for (i=1;i<=app.project.activeItem.numLayers;i++) {
				app.project.activeItem.layer(i).selected = false;
				if (boutonGroupeDiscret.value) app.project.activeItem.layer(i).shy = false;
				nomEditGroupe.text = "";
				}
    }
//fonction sélectionner tout
function tousSelection() {
			for (i=1;i<=app.project.activeItem.numLayers;i++) {
				app.project.activeItem.layer(i).selected = true;
				if (boutonGroupeDiscret.value) app.project.activeItem.layer(i).shy = false;
				nomEditGroupe.text = "";
				}
    }
//fonction inverser la sélection
function inverserSelection() {
		for (i=1;i<=app.project.activeItem.numLayers;i++) {
			app.project.activeItem.layer(i).selected = !app.project.activeItem.layer(i).selected;
			if (boutonGroupeDiscret.value) app.project.activeItem.layer(i).shy = !app.project.activeItem.layer(i).selected;
			nomEditGroupe.text = "";
			}
    }
//fonction sélectionner les calques du groupe
function selectionGroupe() {
	if (listeGroupes.selection != null) {
		var selection = listeGroupes.selection.index;
		
		if (selection == 0) aucuneSelection();
		
		if (selection ==1)  tousSelection();
		
		if (selection ==2)  inverserSelection();
		
		if (selection > 2){
			modeDiscret()
			//tout déselectionner
			for (i=1;i<=app.project.activeItem.numLayers;i++) {
				app.project.activeItem.layer(i).selected = false;
				if (boutonGroupeDiscret.value) app.project.activeItem.layer(i).shy = true;
				}
			//sélectionner les calques portant le bon commentaire
			for (j=1;j<=app.project.activeItem.layers.length;j++) {
				if (app.project.activeItem.layer(j).comment.indexOf(listeGroupes.selection) != -1) {
					app.project.activeItem.layer(j).selected = true;
					if (boutonGroupeDiscret.value) app.project.activeItem.layer(j).shy =false;
					}
				}
			//mettre le nom dans le champ
			nomEditGroupe.text = listeGroupes.selection;
			}
		
		delete selection;
		listeGroupes.selection = null;
		}
	}

//fonction créer un groupe
function newGroupe() {
	//commenter les calques sélectionnés
	for (i=1;i<=app.project.activeItem.numLayers;i++) {
		if (app.project.activeItem.layer(i).selected == true) app.project.activeItem.layer(i).comment = app.project.activeItem.layer(i).comment + "#" + (listeGroupes.items.length-2) + " " + nomEditGroupe.text;
		}
    alert(listeGroupes.items.length-2 + " " + nomEditGroupe.text);
	//ajouter le groupe
	listeGroupes.add("item",listeGroupes.items.length-2 + " " + nomEditGroupe.text );
	nomEditGroupe.text = "";
	}

//fonction supprimer un groupe
function delGroupe() {
		listeGroupes.remove(nomEditGroupe.text);
		//supprimer le morceau de commentaire :
		for (i=1;i<=app.project.activeItem.numLayers;i++) {
			var indexNomGroupe = app.project.activeItem.layer(i).comment.indexOf(nomEditGroupe.text);
			var lastIndexOfGroupe = app.project.activeItem.layer(i).comment.lastIndexOf("#")+1;
			//pas le meme traitement si c'est le tout dernier ou pas
		if (indexNomGroupe != -1 && indexNomGroupe != lastIndexOfGroupe) { 
			app.project.activeItem.layer(i).comment = app.project.activeItem.layer(i).comment.substring(0,indexNomGroupe-1) + app.project.activeItem.layer(i).comment.substring(app.project.activeItem.layer(i).comment.indexOf("#",indexNomGroupe+1));
			}
		if (indexNomGroupe != -1 && indexNomGroupe == lastIndexOfGroupe) { 
			app.project.activeItem.layer(i).comment = app.project.activeItem.layer(i).comment.substring(0,indexNomGroupe-1);
			}
		}
		nomEditGroupe.text = "";
		delete indexNomGroupe;
		delete lastIndexOfGroupe;
	}

//fonction lister les groupes
function refreshGroupe() {
	modeDiscret();
	//parcourir tous les calques, pour chaque calque, ajouter un item si il n'y est pas déjà.
	for (i=1;i<=app.project.activeItem.numLayers;i++) {
		var commentaire = app.project.activeItem.layer(i).comment;
		if (commentaire.indexOf("#") != -1) {
			var groupesTemp = commentaire.split("#");
			//on commence à parcourir à partir de 1 et pas 0 parce que le split crée une case vide au début
			for (j=1;j<groupesTemp.length;j++) {
				var ajouterGroupe = true;
				for (k=0;k<listeGroupes.items.length;k++) {
					if (groupesTemp[j] == listeGroupes.items[k].text) ajouterGroupe = false;
					}
				if (ajouterGroupe) listeGroupes.add("item",groupesTemp[j]);
				}
			}
		}
	}


//fonction qui passe la comp en mode discret
function modeDiscret() {
	app.project.activeItem.hideShyLayers = boutonGroupeDiscret.value;
	}
//fonction qui isole les calques sélectionnés
function isolerSelection() {
			for (i=1;i<=app.project.activeItem.numLayers;i++) {
				app.project.activeItem.layer(i).shy = !app.project.activeItem.layer(i).selected ;
                  app.project.activeItem.hideShyLayers = true;
				}
    }

//===============
//UI
//===============

var fenetreGroupes = (thisObj instanceof Panel) ? thisObj : new Window("palette","Groupes");
fenetreGroupes.bounds = [300,300,524,400];
var nomEditGroupe = fenetreGroupes.add("edittext",[2,2,86,23],"");
nomEditGroupe.onChange = newGroupe;
var boutonDelGroupe = fenetreGroupes.add("button",[88,2,108,23],"X");
boutonDelGroupe.onClick = delGroupe;
var listeGroupes = fenetreGroupes.add("dropdownlist",[110,2,200,25],["None","All","Invert"]);
listeGroupes.onChange = selectionGroupe;
var boutonRefreshGroupe = fenetreGroupes.add("button",[202,2,222,23],"R");
boutonRefreshGroupe.onClick = refreshGroupe;
var boutonGroupeDiscret = fenetreGroupes.add("checkbox",[2,25,222,46],"Use discrete mode");
boutonGroupeDiscret.value = true;
if (app.project.activeItem != null) app.project.activeItem.hideShyLayers = true;
boutonGroupeDiscret.onClick = modeDiscret;
var boutonIsoler = fenetreGroupes.add("button",[2,48,222,68],"Isolate");
boutonIsoler.onClick = isolerSelection;
var boutonGroupesAucun = fenetreGroupes.add("button",[2,70,75,90],"None");
boutonGroupesAucun.onClick = aucuneSelection;
var boutonGroupesTous = fenetreGroupes.add("button",[77,70,150,90],"All");
boutonGroupesTous.onClick =tousSelection;
var boutonGroupesInverser = fenetreGroupes.add("button",[152,70,222,90],"Invert");
boutonGroupesInverser.onClick = inverserSelection;


if (!(thisObj instanceof Panel)) fenetreGroupes.show();

}

dugr(this);
