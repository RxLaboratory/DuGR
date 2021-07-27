/*


Dugr / Duduf Groups for After Effects
Copyright (c) 2011-2016 Nicolas Dufresne
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

(function (obj) {

	//================
	var version = "3.02";
	//================

	//detect AE Version
	var reV = /^(\d+\.?\d*)/i;
	var v = app.version.match(reV);
	aeVersion = parseFloat(v[1]);
	delete reV;
	delete v;

	//Dugr needs to write files
	if (app.preferences.getPrefAsLong("Main Pref Section","Pref_SCRIPTING_FILE_NETWORK_SECURITY") != 1)
	{
	alert("DuProxy needs to be allowed to write files\nPlease, check the box called 'Allow Scripts to write files...' in the general preferences of After Effects.");

	app.executeCommand(2359);

	if (app.preferences.getPrefAsLong("Main Pref Section","Pref_SCRIPTING_FILE_NETWORK_SECURITY") != 1)
	{
	return;
	}
	}

	//DUGR Settings
	if (!app.settings.haveSetting('dugr', 'lockedLayersDeny')){app.settings.saveSetting('dugr','lockedLayersDeny','0');}
	if (!app.settings.haveSetting('dugr', 'warningFrame')){app.settings.saveSetting('dugr','warningFrame','1');}
	if (!app.settings.haveSetting('dugr', 'isolationType')){app.settings.saveSetting('dugr','isolationType','1');}
	if (!app.settings.haveSetting('dugr', 'lockIsolatedLayers')){app.settings.saveSetting('dugr','lockIsolatedLayers','1');}


	function DugrUI(thisObj)
	{

		// ============ IMAGES =============
		{

			function checkFile(name, content)
			{
			var file = new File(name);
			var fileContent = "";
			if (file.exists)
			{
			file.encoding = "BINARY";
			if (file.open("r", "TEXT", "????"))
			{
			fileContent = file.read();

			file.close();
			}
			}
			else
			{
			var folder = new Folder(file.path);
			if (!folder.exists)
			{
			folder.create();
			}
			}
			var success = fileContent == content;
			if (!success)
			{
			file.encoding = "BINARY";
			if (file.open("w"))
			{
			success = file.write(content);

			file.close();
			}
			}
			return success;
			}

				var scriptMng = new Object();
				scriptMng.files = new Object();
				scriptMng.files["/add.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:FCF66383BC3811E58837FAA0A4C21D3E\" xmpMM:InstanceID=\"xmp.iid:FCF66382BC3811E58837FAA0A4C21D3E\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>w\u00B5qj\x00\x00\x00\u00CEIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x0B%\u009A\x0Bw2\u00C0\\\u00C5\u00D8\u00EF\u008E*\u00C7\u00C4@#@3\u0083\x19\x0Bv\x10\f\u00E3\u00DF@\u00FC\x1E\u0088E\u00A1A\u00F7\x07\u009Fb`\u00900\x12\x1B\u00C6 5b\u00F4\b\nF$\u00CC\u0080\x14y(b\u00E8.\u00AE\x03\u00E2\u00EFX\f+E\u00E3s\x02q\x13\u0096\x14\u0082\u00D3`\u0090\x0F\u00BA\u00D1\u00C4\u00BA\u00B0\u00885\x10\x13~\u008EH\x11\"\x07\u00C4\u00B6X\u00D4\u00D9B\u00D5\u00EE\u00C7\x12,8\r\x06I\x1E\u0086\u00F2\u009D\u0091\u00D8\u00C8\x00$\u00E6D\u00C8\u0095\u00C8\u0099d\u00E8e\x10\u009A\x19Ll!t\x15\u0088\u00B9\u0081\u00F8+\u0094\x0F\u00CA\u0085\u00A1\u0094\x1A\f\u008ByP\u00E4\u00EDCJn\r\u0083&(\u00B2q\u00A8U\x03bMr\r\u00C6\u00E7=\u00E4\u00A0 \u00DA`s\u00AA\u0097\u00C7\u00B4\u00AA\u00F3h\x16y\x00\x01\x06\x00\u00D3\u00D4#\u00DD\u00AD\u00AE\b\u00CB\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/add_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:F8E7B7FCBC3811E58A05E9663EFF2E97\" xmpMM:InstanceID=\"xmp.iid:F8E7B7FBBC3811E58A05E9663EFF2E97\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\n\u00FE\x16\u00E0\x00\x00\x00\u00CEIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x0BE\u00BA\u00DB\u00DBa\u00AEbd\u00A8\u00ACD\u0091bb\u00A0\x11\u00A0\u0099\u00C1\u008C\u00FF\u00DB\u00DA\b\u00A9\u00F9\r\u00C4\u00EF\u0081X\x14\x1At\x7F\u00F0\u00AA\u00AE\u00ACd$6\u008CAj\u00C4\u00E8\x11\x14\u008CH\u0098\x01)\u00F2P\u00C4\u00D0]\\\x07\u00C4\u00DF\u00B1\x18V\u008A\u00C6\u00E7\x04\u00E2&,)\x04\u00A7\u00C1 \x1Ft\u00A3\u0089ua\x11k &\u00FC\x1C\u0091\"D\x0E\u0088m\u00B1\u00A8\u00B3\u0085\u00AA\u00DD\u008F%Xp\x1A\f\u0092<\f\u00E5;#\u00B1\u0091\x01H\u00CC\u0089`\u00E8#e\u0092\u00A1\u0097Ahf0\u00B1\u0085\u00D0U \u00E6\x06\u00E2\u00AFP>(\x17\u0086Rj0,\u00E6A\u0091\u00B7\x0F)\u00B95\f\u009A\u00A0\u00C8\u00C6\u00A1V\r\u00885\u00C95\x18\u009F\u00F7\u0090\u0083\u0082h\u0083\u00CD\u00A9_\x1E\u00D3\u00A8\u00CE\u00A3Y\u00E4\x01\x04\x18\x00:\u00CF#\u00F9\x14\u00D1\u00B8\u00D6\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/adjustmentLayer.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:88864091566611E5A96AB86EFF43FC71</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:88864091566611E5A96AB86EFF43FC71</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:09+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:16:48+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:09+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:09+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>K\u00EFo\u00BA\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01\x7FIDATx\u00DA\u00C4\u0093\u00B1j\u00C2P\x14\u0086\x7F\u008B\u00C4p\u00B9\u00E8X\u00C1\u00A1c\u0096\u00C6+\x0E\u00EE1\u008Bs\u0087\x0E\u0085\u00DB\u00C1]\u0090\u00E2\u00A6y\u0084\x16\u00FA\bY\u00EB\\p\u00CA\x03\x18\"\x01\u00D370\u00D8\x0E\x11.\u00C4\u0080 \u009C\x0EE\u00B1\u00EDu\u00EA\u00D0\x03g9\u009C\u00EF\u00BF\u00E7\u009C\u009F[\"\"\u00FC%.\u00F0\u00C7(\u00FF,\u00B4\u00DB\u00EDr\u009E\u00E7\u0097y\u009E\u00D7\x01\u00A0R\u00A9\u00E4\u00BB\u00DD\u008E\x03\x00\u00E7\u00FC\u009Ds\u00FE\u00B1X,\u00F6g\x05\u00B2,\u00B3j\u00B5Z\"\u00A5D\u00A7\u00D39\u00D6\u00E7\u00F39\u00A6\u00D3)\u00B2,\u00BB\x06\u00F0\u00A6]\u00C1\u00B2\u00ACF\u00B3\u00D94}\u00DFGQ\x14\u00F0<\x0F\u00FD~\x1F\u009E\u00E7\u00A1(\n\u00F8\u00BE\x0F\u00DB\u00B6\u00CB\u0096e5\u008E\x10\x11\x1DS\ba\u0086aH\u008E\u00E3\x10\u0080_9\x1C\x0E)\fC\x12B\u0098\x07\u00E6\u009B\u00C0d2y\x1E\u008DFZ\u00F8\u00EB-\u00A2\u00D5jE\u00E3\u00F1\u00F8\u00F1\u00C0|[A\bq\x17\x04\u0081\u00F6\u00DA\x07\u00BB\u00AB\u00D5*Z\u00AD\u00D6\u00BD\u00F6\x06\u0086a\u00F0\u00F5z}\x16\x06\x00\u00C6\x18\f\u00C3\u00E0Z\x01\u00C6\u0098Y\u00AF\u00D7\u00CF\u00C2\x00\u00B0\u00DDn\u00C1\x183\u00B5\x02I\u0092\u00BC:\u008Es\x16\x06\x00\u00A5\x14\u0092$y\u00D5\u00BA\u00E0\u00BA\u00EEU\x1C\u00C74\x18\fH\x17\u009B\u00CD\u0086\u00E28&\u00D7u\u00AF\u00B4.\x10\x11\u00A4\u00947Q\x14Q\u009A\u00A6\u00A4\u0094\u00A2\u00FD~OJ)J\u00D3\u0094\u00A2(\")\u00E5\u00CDi\x7FI7f\u00B7\u00DBm\u00F4z\u00BD'\u00DB\u00B6o\x0F\u00B5\u00E5r\u00F92\u009B\u00CD\x1E\u0082 HO{K\u00FF\u00FE\x1B?\x07\x00.\u00D5\t^wRW\u00A2\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/adjustmentLayer_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:129B7A1FBC3A11E5BCD5EA8005853213\" xmpMM:InstanceID=\"xmp.iid:129B7A1EBC3A11E5BCD5EA8005853213\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>E\u00E2\x16\b\x00\x00\x00\u00A0IDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u00C0\u0082\u00C2su\u0085\u0089\u0089\x03\u00B1\x04T\u00F4\x0B\x10\u00F3@\u00D9/\u0080\u00F8%\x10\u00FFa\u00D8\u00BD\x1B\u008B\x01\x10\u00A0\x0E\u00C4W\u00F0X\u00AA\x03\u00C4WqyA\x1A\u00889\u0088p\u00B54v/00\u00BC\x05\u00E2'\x04\f\u00B8\x00\u00C4\u009C\u00B8\\\u00D0Id\u00D8\u00B5\u00E22 \u008AH\x03\u00E2p\x19\u00C0C\u00A4\x01<\u00B8\f\u00E0 \u00D2\x00\x0E\\\x06l%\u00D2\u0080\u00AD\u00B8\f\u00C8&\u00D2\u0080l\\\x06<\x04\u00E2`\x02\u009A\u0083\u00A1\u00EAp\u00E6\u0085u@,\x03\u00C4\u00AB\u00D0\u00C4WA\u00C5\u00D7!\x0B2\x0Exn\x04\b0\x00~}\x1A\u00853\x02=\u00E9\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/audioEnabled.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:DBFBEEDD566511E58A3EB47F82201F1A</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:e62442e3-3c4b-4248-ba5a-05a37b94c38f</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:DBFBEEDD566511E58A3EB47F82201F1A</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:e62442e3-3c4b-4248-ba5a-05a37b94c38f</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:01+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:11:58+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:01+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:01+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u00D7w9\u00F1\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01.IDATx\u00DA\u00CC\u0093\u00BFK\u00C3@\x14\u00C7\u00BF\x15\u0087\b\u00E6\x0F\u00E8\u0083@\u008B\u00A4\u00EEJ\u0087d\x12\u00CC\u0092\u00A1\u00FF\u0081\u00E0\u00E2\u00DA=K\u00FE\x07\u0097\f\u0082\x19L\x0E\x0E\\B \x11\x04\u0083\u00ED\u00E0R\x10\u009C\u00FB\x07\u00DC\u00EA^\u00EF8\u00A7s\u0088i\rt\u00F1\u00C1\x1B\u00DE\u00AF\x0F\u00EF\u00EE{7\u00D0Zc\x1F;\u00C0\u009E\u00B6\x13@D\u0093?\tZ\u00EBNw\x1Cg\u00C49\x7F4\u00F1p8\u009Ct\u00F5m\x1Df\u008C\u00F1\u00A6iV&\u00B7X,\u00DE\u00BB \u0087\u00EDum\u00DB\u00FEL\u0092\u00E4\u00DE\u00B2\u00ACK\u00A5\u00D4\u009B\u00A9\t!\u00CE\x19c+\"\u00BA\x12B\u00AC\u00CD\u00DC\x0F M\u00D3;\x00\x17&\u0096R\x02\u00C0\x17\x00dY\u00F6@D\u00D7D4\u008D\u00E3x\x0E`\u00FE\u00EB\x12\u00A5\u0094JJ\u0089\u0096+\x00\b\u0082\u00C0\u008B\u00A2\u00E8\x06\x00\u0094R\u009BN\x15\u00A4\u0094\u009B\x0E\u00C0\u00C6\x1Ca<\x1E\u009F\u0099\u00BEN\x00\x11\u009D\x10\u00D1\u009A\u0088\u00D6m@\u0092$\u00B7\u00B3\u00D9,\x10B\u009C\u00BA\u00AE;\u00DD)c\x18\u0086\u00A3\u00E5r\u00F9\u00C19\u00D7m\x19\u00CB\u00B2|\u00EE%\u00A3\u00EF\u00FB\u00C7u]\u00BF\u00E6y\u00CEL\u00AE(\u008A\u00A7\u00DE\u00EF@k\r\u00CF\u00F3\u008E\u00AA\u00AAz\u00D9V7>\u00F8\u00DF\u009F\u00A9\u008F}\x0F\x00v[E\u00D1s\u00C3\u00A6\u0091\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/audioEnabled_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:0BA0372EBC3A11E5A7BDBEFB44C9ADA5\" xmpMM:InstanceID=\"xmp.iid:0BA0372DBC3A11E5A7BDBEFB44C9ADA5\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>^P\u0093\u00E7\x00\x00\x00\u00C0IDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u00C0\x02g\u00B9\u00BAb\u0093W\x03\u00E2[\x18\u00A2\u00BBw\x13\u00E5\x02\x05 nA3\u008Ch/\u00804\u00B7Ci\x18X\u008E\u00CD\x10&4\x1B@X\x14\u0088\u00E7\x00q\x04\x10\u00FFB\u00923\x06\u00E2%\u00E8\u0086 \x1B0\x13\u0088o\x02\u00F1+ v\u0086\u008A\u00FD\u0086\u00D2\x0B\u00A1\x1AM\u00818\x17\u0097\x01\x7F\u00B1x\x05&f\t\u00C4)P\u00F6/\\\x06\u00FC\u00C2b\x00\u00B2\x17\u008C\b\x19\u00A0\f\u008D\u00B2[X\f\u0098\x00\u00C4.@\u00AC\x0E\u00F5\x06V\x03\u00D4\u00A1\u00D8\x1D\u0088/\u00A2\x19\u00E0\x05u\u00C5d\u00A8Ax\u00A3\u00F1\x01\x10\u00DB\x00\u00F1\x014\u00E7N\u0080\x1ANT:\u00F8\x02\u00B5U\x02I\u00CC\x0B\u009BB\u00C6\x01\u00CFL\x14\x1B\x00\x10`\x00\u00AB\r'\u00BA\u00D1\x01#k\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/collapseTransformation.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:33B9CCBF566611E5A0AAEB9A621565A4</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:713793cd-7e40-2d4a-8d3d-2025d1fec025</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:33B9CCBF566611E5A0AAEB9A621565A4</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:713793cd-7e40-2d4a-8d3d-2025d1fec025</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:37:45+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:14:25+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:37:45+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:37:45+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>3c\x15\u00F5\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01:IDATx\u00DA\u00D4\u00931k\u0083`\x10\u0086\u00DF\u0094\u0082\u00A0\x10\u0082\u00E5\x0B\x1F\x0E~\u008BS\x02.\x0Eq\u00B1\u008B\u0093?@HV\x07\x7FT\x06\u00A7@\u00DC\x1C\u00D3\u00C5\u00C1v\u00C9\u00E2hv\u0087\u00AAK\x16\u00A1\x0E%\u00E1:\u00B5\u0084T\u00DB!t\u00E8\u00C1\u00BB\x1C\u00CF\x1Dw\u00BCw#\"\u00C2-q\u0087\x1B\u00E3\u00EF\x1Bh\u009A6\u00FB\x11 \u00A2o\u00D2u\u00DD0MS&\"dY\u00F6JD0MS\u00D6u\u00DD\u00B8f{'\u0088\u00A2h\u00C79\u009F\n!\u008C\u00D3\u00E9\u00F4.\u008408\u00E7\u00D3(\u008Av\u00D7\u00EC\u00A8\u00CF\u0085\u00D5j\u00E5,\u0097\u00CB\u00E7\u00A6i \u0084@Y\u0096\u00E0\u009C#\u008E\u00E3\u00C7\u00EDv\u00FBr\u00C9\u00DE\x0F\u00EC|t\x1C\x07i\u009A\u00A2(\n\u00CC\u00E7s\u00B8\u00AE\u008B,\u00CB\u008E\u009A\u00A6\u00CD\u00AA\u00AA:\fN\u0090\u00E7\u00F9\x1B\x00\u00B4m+\u0087a\u00F8\u0095_\u00AF\u00D7\x18\u008F\u00C7\x1D\x00X\u0096\u00A5\f\u00BA`Y\u0096\x12\x04\x01\u00AB\u00EB\x1A\u009E\u00E7\u00E1|>\u00C3\u00F3<\u00D4u\u008D \b\u00D8eq\u00EF\n\x00\u00C0\x18\u009B\u00A8\u00AAzp]\u00B7\u00B3m\u00FB\u00A8(\u00CA\u0083$I2cl\x02\u00A0\u00FB\u00D5\u00C6$I\u00F6\u00BE\u00EF/\u0088\b\u009B\u00CD\u00E6\u0089\u0088\u00E0\u00FB\u00FE\"I\u0092\u00FD5\u00DB\u00DB\u00E0R\u009Fw0\u00A4\u00D1\u00FF\x7F\u00A6\u008F\x01\x00>q\u00D5|\u00BF\x0Bu*\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/collapseTransformation_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:EE1B116EBC3911E5B39FFABC7D153B95\" xmpMM:InstanceID=\"xmp.iid:EE1B116DBC3911E5B39FFABC7D153B95\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00E4\u00FE\x00J\x00\x00\x00\u009DIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B@\u00B1\x01,\x18\"\u00AE\u00AE\u00E8\"Z@|\rEd\u00F7n\u0082.P\x01b.\u0098r(\u00CD\x05\x15'\u00CA\x0B\u00DB\u0081X\f\u00AA\u00E1\x17\u0094\x16\u0083\u008A\x13\u00F0\x02\x04$\x01\u00F1}$\u00FEm(mG\u008C\x0B@~~\u008B\u00C3\u00E0\u00B7Py\u00BC.8\u008D'\u00D0ar\u00DC\u00F8\f\u00E0\u0086\x06\u00D8W,r\u00A2@\u00FC\u008D\u00980\x10\u0080F\u00DD7\u00A8\u00B3\u0085\u00A1\u0086\n\u00A0\x1B\u0080+\x16\u00D6A\x03\u00D2\x14\u00CA7\u0085\u00F2\u00D7\x11\x1B\x0B\x16Hl](}\x12M\x1C\f\x18\u0087~f\x02\b0\x00**\x1D2\u00C3\u00D6{\u0084\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/custom.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:0B6C0CC5BC3C11E5BB2897EADA4DBEA0\" xmpMM:InstanceID=\"xmp.iid:0B6C0CC4BC3C11E5BB2897EADA4DBEA0\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:dfff08ac-2024-1946-a3cd-862900f1e269\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00CB>H9\x00\x00\x00hIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\x00\u00CD\ffA\u00E6\x14\u00EEd\u00A0(\\\u00FA\u00DD\x19\x18\u00B1\x1A\u008C\x050B5`\x05\u00F8\x1C\u00C2\u0082\u00CF@\"\x00L\u00DD\x7F\u0092\u00C3\x18\u0097kI\ncR\r\u0084\u00A9\x01\x06\u00C90Hn\u00A3\x06\u008F\x1A<P\u00A5\x1B\x12\u00F8\x0F\u00CDM\u008C\u00F8r 9\u0085\x10\u00BA\x05$\x03\u00C6\u00D1\u00AA\t\x06\x00\x02\f\x00\u00A2=\x1808r\u0082{\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/custom_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:08F417BBBC3C11E5B7ABB44AC84A8382\" xmpMM:InstanceID=\"xmp.iid:08F417BABC3C11E5B7ABB44AC84A8382\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:dfff08ac-2024-1946-a3cd-862900f1e269\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\b1G\r\x00\x00\x00bIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\u00E3\x107\u00B8\u00BD\u009D2[*+\x19aL\x16B\x16C5`\u0097\u00C5\u00E3\x10\x16\u00BC\x06\x12\u00E1c(\u008Da\x01\x13\x11\u00DE#+TX(2\x10\u00A6\u00A6\u00BD\u009D\u0081t\x17\u0093\tF\r\x1E5x8\x18\u008C+\u00E7\u00FD\u0087\u00E6&F\u00BC9\u0090\u008CB\b\u00DD\u0082\x11W\u0083P\x11\x00\x04\x18\x00\u00A2\x1F'\x1A<\u00C2\u00812\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/delete.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\f\x00\x00\x00\x02\b\x06\x00\x00\x00l\x7F=\u0097\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00 cHRM\x00\x00z&\x00\x00\u0080\u0084\x00\x00\u00FA\x00\x00\x00\u0080\u00E8\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17p\u009C\u00BAQ<\x00\x00\x00\x06bKGD\x00\x00\x00\x00\x00\x00\u00F9C\u00BB\x7F\x00\x00\x00\tpHYs\x00\x00.#\x00\x00.#\x01x\u00A5?v\x00\x00\x00\x19IDAT\b\u00D7c,\u00D8\u00F1\u00FF?\x03\u00F1\u00E0\x17\x13\t\u008A\x19\x18\x18\x18\u00D8\x00]\u00C2\x04*\u00A6zJ\u00BB\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/delete_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x03\x00\x00\x00\u00F3j\u009C\t\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:754A3FB5BC3711E58FBEC918BBA6AB19\" xmpMM:InstanceID=\"xmp.iid:754A3FB4BC3711E58FBEC918BBA6AB19\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>;\u00FA\u00B4\u00E3\x00\x00\x00\tPLTE\u00FF\u0089\u0089\u00FF\u0086\u0086\u00FF\u00FF\u00FF\u00898\u00F5P\x00\x00\x00\x03tRNS\u00FF\u00FF\x00\u00D7\u00CA\rA\x00\x00\x00\x1DIDATx\u00DAb`\u00C2\n\x18\u0086\u00A30#\x020`\x17f\x1C\u00BE\u009E\u00C7\x00\x00\x01\x06\x00\u00A6\x14\x03\u00B00\"\u00F7N\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/dynamic.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:F8DA12C8BC3B11E59DC5D7D254E68ACC\" xmpMM:InstanceID=\"xmp.iid:F8DA12C7BC3B11E59DC5D7D254E68ACC\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:b64a9c04-f84f-4b4d-aa29-48b0fadce681\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x1C\u0099\u00D2\u00F3\x00\x00\x00{IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\x00\u00CD\ffA\u00E6\x14\u00EEd\u00A0(\\\u00FA\u00DD\x19\x18\u00B1\x1A\u008C\x050\x12\u0090\u00FFO\u0094\u008B\t\x18\u00F8\x1F\u008B\x1C#.\x0B\u0098\u0088\u00F0\x1E\x18\x13\x12#\u00D6\u00C5\x045\"\u00AB\x01\u00C6\u00CD0Hn\u00A3\x063\x10\u009BAH\u00C9,d\u00BB\u00F8?\u00BE\u009C6|\u00C3\u00F8?471\"\u00E5@\u008C0\u00C6W\x1A\x12\u008A\u00BC\u00FF\u00D8\u00B2+61\u008C\u0098\x1E\u00AD\u009A`\x00 \u00C0\x00S\u00F1\x1C\u00DE\x06zuT\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/dynamic_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:FD61C362BC3B11E591B18B701EE81423\" xmpMM:InstanceID=\"xmp.iid:FD61C361BC3B11E591B18B701EE81423\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:b64a9c04-f84f-4b4d-aa29-48b0fadce681\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u009B\u00F7\u00F5F\x00\x00\x00yIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\x00\u00CD\ffA\u00E1\u00B5\u00B7S\x16.\u0095\u0095\u008C\u00D8\r\u00C6\x04\u008C\x04\u00E4\u00FF\x13\u00E7b\u00FC\x06\u00FE\u00C7\"\u00C7\u0088\u00CB\x02&\"\u00BC\x07\u00C1\u0084\u00C4\u0088t1A\u008D(j\u00DA\u00DB\u0087Ar\x1B5\u0098\u0081\u00D8\fBJf!\u00DB\u00C5\u00FF\u00F1\u00E5\u00B4\u00E1\x1B\u00C6\u00FF\u00A1\u00B9\u0089\x11)\x07b\u00861\u009E\u00D2\u0090\u0085`\u00B8b\u00C9\u00AEX\u00C5\u00D0cz\u00B4j\u0082\x01\u0080\x00\x03\x00\u00BA\u00E7\x1D\x16VM\u00A5a\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/effectsActive.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:548B3B04566611E5B160F27CC91D6F73</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:7237903b-eb4d-2547-bdf0-7cc271d40ef5</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:548B3B04566611E5B160F27CC91D6F73</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:7237903b-eb4d-2547-bdf0-7cc271d40ef5</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:36:43+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:15:20+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:36:43+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:36:43+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u009F\u00C6aX\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01hIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u0080\u00D3\u0080\u00D4\u00D4T\u00C9k\u00D7\u00AEm\u00BA\x7F\u00FF\u00FE\u00DE\u00CB\u0097/\u00AF\u00C7\u00A5\u008E\x11\u0097\x17.^\u00BC\u00B8\u00F6\u00C1\u0083\x07W\u00F6\u00EE\u00DD\u00BB\u00F8\u00F3\u00E7\u00CF\u00EF\u00E7\u00CF\u009F\u00FF\x16\u00AB\u00C2\u00FF\u00FF\u00FFc\u00E0\u0096\u0096\x16\u00D7\u00ABW\u00AFn\u00C2&\u0087\u008E\u00B1zA__\u00DF\u00FE\u00D0\u00A1C\u00AB\x19\x18\x18\x18\u0084\u0084\u0084\u0098\u00F1\u0085\x01\u008A\x17\u00B6n\u00DD\u00DA\u00A6\u00A8\u00A8\u00A8\u00F3\u00E1\u00C3\u0087W\u00C2\u00C2\u00C2\u0092\f\f\f\f\u00E2\u00E2\u00E2\u008A\u00E7\u00CE\u009D\u00DB\u00ED\u00E4\u00E4\u0094\u00CF\u00C0\u00C0\u00C0\u00B0s\u00E7\u00CE\x1Ennn>\x1B\x1B\u009B4\u00AC^(**\u00D29y\u00F2\u00E4\u00A2\u00D8\u00D8X>\u0098\u00D8\u00B9s\u00E7V\u00A5\u00A5\u00A5Io\u00DF\u00BE\u00BD\u00F3\u00E0\u00C1\u0083\u00D3\u00F1zAMM\u00CD\u00E4\u00CF\u009F?\u00BF\x16-Z\u00F4\t&\u00B6\x7F\u00FF\u00FEe111O~\u00FE\u00FC\u00F9\u00C3\u00CE\u00CE.\x13o4\u00CA\u00CB\u00CBk>y\u00F2\u00E4\x16\u00B2\u0098\u0089\u0089\u0089;???\u00C3\u008B\x17/\u00EE\x13L\x07LLL\u00CC\u00F7\u00EE\u00DD\u00BB\b\u00E3\u00EF\u00D8\u00B1\u00A3\u00F3\u00F3\u00E7\u00CF\u00EF\x17.\\\u00A8\u00AB\u00A7\u00A7g\u008F\u00D7\u0080\u00B2\u00B22}666\u008E\u00CB\u0097/\x1Fa```\u00D8\u00B5kW\x0F\x13\x13\x13\u00B3\u00B7\u00B7wUoo\u00EF\u0095\u00D7\u00AF_?:t\u00E8\u00D0t\u009C\u00E9`\u00DA\u00B4i\u00B1\u00DB\u00B7o\u00EF$&\u00FE\u00B1\x06\u00A2\u0089\u0089\u0089\x076\x7F\x12\u009D\x0E\x06$7\x02\x06\x00\u00ED\u0099\x00=\tg\u00DCV\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/effectsActive_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:E5C53E99BC3911E5B05892B68CABD86B\" xmpMM:InstanceID=\"xmp.iid:E5C53E98BC3911E5B05892B68CABD86B\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>*\u00E6\u00C9\u00C2\x00\x00\x00\u00D8IDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u00C0\u0082\u00C2suE\u00E6I\x02\u00F1L \u00E6\x06\u00E2O@\x1C\u0088\u00A2v\u00F7n,\x06\u00A0\u0082)@|\x1E\u0088\x17\x03\u00F1{\u00E2\\\u0080\u00E4\x16 f\x05\u00E2zr\u00C3\u00C0\x1E\u0088WC\u00D9\u00CC\u00A4\x18\u00D0\x06\u00C4\u009B\u0080X\x02\u0088#\u0080x+\x10_\x06\u00E2\u0089Hjz\u0080x\x16./T\x01\u00B1\x0E\x10\u0097\x01q$4\u00F0@`\x15\x10K\x03q\x1E4P\u00D3\u00F0y\u00C1\x04\u0088\x7F!i\x06\u0081e@\u00FC\x04\u0088\x7F\x00q&\u00A10\u00D0\x04\u00E2[hb\u00EEP\u00FA>1\u0081\b\n\u00B4\u008BH\u00FCNh4\u00EAB\x03\x17\u00AF\x01\u00FA@\u00CC\x01\u00C4G\u0090\x02\u008C\x19\x1A6W\u0080\u00F8\x11\x10O\u00C7\u0097\x0E\u00F4\u0080\u00F8+\x14\u0083@\t\u009A|=!\x17x`\u00F3'>\u00C08\u00E0\u00B9\x11 \u00C0\x00c\u00DF*/\u00D6G\u00CB\u00FA\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/empty.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x02\x00\x00\x00\u0090\u0091h6\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03&iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:DocumentID=\"xmp.did:19A0AFFB566711E59FBA96670A26DD6C\" xmpMM:InstanceID=\"xmp.iid:19A0AFFA566711E59FBA96670A26DD6C\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:964794B6566611E5939F83811C508288\" stRef:documentID=\"xmp.did:964794B7566611E5939F83811C508288\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\tl\u008F\u00C3\x00\x00\x00:IDATx\u00DAb466f \x05\u00B0\x00\u00F1\u0087w\u00EF\u0088T- $\u00C4\u00C4@\"`A\u00D6\u008DG\x1D\u00DC\x15$\u00DB0\u00AAaph`\u00C1\u008CK\x1A\u00D8\u0080?\x15\u00A1\x01\u0080\x00\x03\x00!\u00AB\t\u00C1D[\x05\u00B8\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/enabled.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0E\u00C4\x00\x00\x0E\u00C4\x01\u0095+\x0E\x1B\x00\x00;\u00A6iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:09:01+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:39:14+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:39:14+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <xmpMM:InstanceID>xmp.iid:1d5eb2b6-732b-4744-ad11-72fce947ca29</xmpMM:InstanceID>\n         <xmpMM:DocumentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</xmpMM:DocumentID>\n         <xmpMM:OriginalDocumentID>xmp.did:6bf44f22-efa4-5c40-8c6d-43bb2f717807</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>created</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:6bf44f22-efa4-5c40-8c6d-43bb2f717807</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:09:01+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:5a551b40-0172-0c4f-921d-2331a09ffa99</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:11:15+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:1d5eb2b6-732b-4744-ad11-72fce947ca29</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:39:14+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>960000/10000</tiff:XResolution>\n         <tiff:YResolution>960000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\x0B\u00F9`\u00BA\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01tIDATx\u00DA\u00D4\u00D3\u00B1\u008A\u00EA@\x18\u0086a\u00AB\u00ADN\u00B5U*\x15\x11\u00E2\u00CC \u00A2\u00B00\u00C4!\u0095X\u00C5&\u0087\u0090+Xb\u00D8\u00C1\"6b\x1F\x02\x16\u0083cFA\u00D2$\u0085i\x03\u00A9\u00BD\u00AB\u00BD\u0080o\u00EB\u00C5eY8\u00CD\u00D9\u00E2m\u009F\u00E6\u00FF\u00FE\x0E\u0080\u00CE\u00BF\u00D4\u00F9\x7F\u0081\u00E9t\u00FA\u00C4\x18\u00B3\x18c\u00D6x<~\u00FE10\u0099L\u00FE\u00F4\u00FB\u00FDy\u00AF\u00D7\u009B\x0B! \u0084\u00C0l6{\u00B2,\u00EB/!\u00A4\u00FB-@\b\u00E9RJ\u00BB\u00DB\u00ED\x16\u00B7\u00DB\u00EDSy\u009Ec\u00B9\\\u00CE\x07\u0083\u00C1\u00CB\u0097\x00c\u00CCZ,\x16/\u00D7\u00EB\x15y\u009Ec\u00BF\u00DFc\u00B3\u00D9@J\u0089\u00DDn\u0087\u00E3\u00F1\u0088\u00B2,\u00B1^\u00AFK\u00DB\u00B6\u0087\x0F\u0080\x10\u00A2[\x14\x05\u0092$\u0081\u00E7y\u00E0\u009C\u0083s\u008E\u00CB\u00E5\u0082\u00F3\u00F9\f\u00CF\u00F3\u0090$\t\u008A\u00A2\u00C0j\u00B5Z=\x00\u0087\u00C3\x01Q\x14A)\x05\u00CE9\b! \u0084@)\u0085\u00FB\u00FD\x0E\u00CE9\u0094R\u0088\u00A2\b\u00A7\u00D3\t\x0F\u00801\x06\u00C6\x184M\x03\u00C7q0\x1A\u008D>\u00E58\x0E\u009A\u00A6\u00811\x06J\u00A9G \f\u00C3\u00B7\u00AA\u00AA\u00D0\u00B6-\u00A4\u0094\u00A0\u0094\u00C2\u00B6m\u00D8\u00B6\rJ)\u00A4\u0094h\u00DB\x16UU!\f\u00C3\u00B7/\u00AF\x10\x04\u00C1\u00AB\u00D6\x1Au]#\u00CB2\u00F8\u00BE\x0F\u00DF\u00F7\u0091e\x19\u00EA\u00BA\u0086\u00D6\x1AA\x10\u00BC~\u00BB\x03\u00D7u\u0087q\x1C\u0097i\u009A\u00BEk\u00AD\u00A1\u00B5F\u009A\u00A6\u00EFq\x1C\u0097\u00AE\u00EB\x0E\x7F\u00D1/\u00FC\u00B4\u008F\x01\x00@\u008E\u00966\u00FE~P\u00EE\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/enabled_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:E0FAF8A9BC3911E58104A07340C942B3\" xmpMM:InstanceID=\"xmp.iid:E0FAF8A8BC3911E58104A07340C942B3\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>rt\u00BF0\x00\x00\x00\u009FIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B@\u00B1\x01,p\u0096\u00AB+\u00BA\x1C\x1B\x10\x0BA\u00D9\u00BF\u0080\u00F8\x1D\u008A\u00EC\u00EE\u00DDh\x06 \x00\x0F\x10\u00EBC\u00D9G\u00A04;\x10\x07\x03\u00F1i ~\u0084\u00DD\x05\x10 \u0087\u00A6\x11\x06~Bi\x1B \x16\u0087\x1A\u0084\x11\x06\x12P\u00C9\u0087x\u00BC\f28\x1B\u0088U\u00B0\x19\x00\u00F2\u00F3)\"\u00C2-\x1E\u00885\u00B1\x19\u00F0\u0090\u0084\u00C0\u00DFD\u0093t\u0090C\u0082\u00BE\x1Cl\x06L\x05\u00E24\"4\u00A7A\u00D5b\u00F5\u00C2l V\x05\u00E2\u0085@\u00FC\x05I\u00FC\x0BTL\x15\u00AA\x06\x0E\x18\u0087~f\x02\b0\x00\u00F1\u00D9\x1C\u00E4\u0081\u008D\u00C5n\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/exit.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00 cHRM\x00\x00z&\x00\x00\u0080\u0084\x00\x00\u00FA\x00\x00\x00\u0080\u00E8\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17p\u009C\u00BAQ<\x00\x00\x00\x06bKGD\x00\x00\x00\x00\x00\x00\u00F9C\u00BB\x7F\x00\x00\x00\tpHYs\x00\x00.#\x00\x00.#\x01x\u00A5?v\x00\x00\x00MIDAT8\u00CBc(\u00D8\u00F1\u00FF?\x03\u0099\x00\u00AE\u0097\x1CC0\u00F4\u0090b\bN\u00B5\u00C4\x18BP\r>\x05D\u00BB\x12\u009BB\u0092\u00C3\tY\x03\u00D91U\u00B0\u00E3\u00FF\x7FB\u009A\u0099\u00C82\u0099\u00E6^\u00A0(\x10)\u008AF\u008A\x12\x12EI\u0099\u00A2\u00CCDiv\x06\x00\u009EZ^w\u00A6`s\u00A0\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/exit_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x03\x00\x00\x00\u00F3j\u009C\t\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:57E87D66BC3711E5918EA805287932E4\" xmpMM:InstanceID=\"xmp.iid:57E87D65BC3711E5918EA805287932E4\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00BB\x10\u00A7H\x00\x00\x00\x06PLTE\u00FF\u0086\u0086\u00FF\u00FF\u00FF\u00B7\u0089\u0098\u00C4\x00\x00\x00\x02tRNS\u00FF\x00\u00E5\u00B70J\x00\x00\x00CIDATx\u00DA\u009C\u0091\u00C9\x11\x000\b\x02\u00D7\u00FE\u009B\u00CE7\u009A\u008D9\u00FC\u00C1\u008C\u0080H\u00E8\u00F0L\u00B3\u00A1X\u00F6\u00A9R\u0089\u00A0x\u00D1\u00C2j\u00C2,\u008A\u00E5\u0086\u00B8\u00A7]\u00C4-\u00FB\u00BC\x19\u00FB\u00F1^\x15\u00C7\u00AE\u00FF\u009E6\x04\x18\x00\u00C0\u00BD\x01\u00C5\u00B9\u009Cp\u0087\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/frameBlending.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:7610C58C566611E583F7E1E52CC47E97</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:19c9bb0b-abe9-a449-913a-da71421075bf</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:7610C58C566611E583F7E1E52CC47E97</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:19c9bb0b-abe9-a449-913a-da71421075bf</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:39:04+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:16:17+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:39:04+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:39:04+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u0082\u00AC\u00D0\u00CC\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x018IDATx\u00DA\u00C4\u0093\u00B1j\u0083P\x14\u0086\u00FF\u0094\x0E}\u0085:\u0086N\u00A1\x19|\x00g\x1F\u00C0\u00C1A\u009C\f\u00CE\x1D\u00C4\u00A5[\u00E9R\x112D$H\x02\x01\u00A7PB]\u00F2\x06}\u0084\u0092\u00A9\u00B3\u00A8\u008F\u0090{\u00CEM\u00974xcJ\x02\x19z\u00E0,\u00F7\u00E7\u00FF9\u00E7;\u00DC\u00DEn\u00B7\u00C35u\u0083+\u00EB\u00F6\u00F8A\u00D3\u00B4\u0087K\u008CeY~\u009F\fX\u00AF\u00D7\x1F\x00\x1E\u00CF\u00F8\u00BF\x00\f\u0095\u0080~\u00BF\x7F/\u0084\u00B8+\u008A\u0082-\u00CB\u00C2j\u00B5B\x1C\u00C7\u008A+\b\x02\u00EC5\u00EE\u00AC\x10\u0086\u00E1SUU!\x11a\u00B9\\\u0082\u0088 \u0084P\x02Z\u009A\u00E8@\u0094Rr\u0092$`f\u00D8\u00B6\rf\x06\x11)\u00DD\u00D2\x0E\x13\u00F4~\u00CF8\u0099L^\u00EB\u00BA~6M\u00F3\x12\u0086\u009F\u0086a\x18\u009D\t\u00A6\u00D3)\u0088\b\u00AE\u00EB\u0082\u0088\u0090\u00A6\u00A9\u00D2-m\u00DBa\u00C0\u00CC\u00DB\u00D1h\x04)%\u00E6\u00F39\u00A4\u0094\x1D\x06-\u008DO1\u0090\u00B3\u00D9\f\u00CC\f\u00CF\u00F3\u00FEd\u00B0\u00D7d\u0087A\x14Ea\u00D34o\u008E\u00E3\u009C\u00BB?\x00@\u00D7\u00F5\u00E1\u00F1\n\u00BCX,\u00C0\u00CC\u00D8l6\u008Ak0\x18 \u00CFs\u00B8\u00AE\u00FB2\x1E\u008F\u00DF\u00DB\u00DAa\u0082,\u00CB\u00E2K\u00F0\u00FB\u00BE\x1F\u009C\f\u00F8\u00B7\u00DF\u00F83\x00\u00BA\u00D2\u00DB{\u00ADw\x00\u00F1\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/frameBlending_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:DAEE7806BC3911E5833A877B11B96F05\" xmpMM:InstanceID=\"xmp.iid:DAEE7805BC3911E5833A877B11B96F05\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>uP\u00F3\u0080\x00\x00\x00\x7FIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u00C0\x02g\u00B9\u00BA\u00C2X*D\u00E9\u00DC\u00BD\u00FB\x0E\u00AA\x01\b\u00B0\x1E\u0088u\bh\u00BF\x02\u00C4\u00BA\u00E8\x06H\x021\x07\x10\u00FF%\u00C2\u00FE\u00BF\u00D8\u00C2\u00A0\x00\u0088\u00EF\x01\u00B1>\x11\x06\u00FC\u00C6f\u00C0_\x12\u00C2\x0E\u00AB\x0B\u00FE\u0091`\x00\u00C5.\u00F8\u0085\u00CD\u0080_\u00F4\u00F4\u00C2?\u00CC\u0084D\u009C\x17\u00AE@iir\rh\x02\u00E2\u00D5\u00D8\u00932$!\u00F5\x120\u00C0\x1C\u00DD\x00\u00C6\x01\u00CF\u008D\x00\x01\x06\x00t2\x1F\x0F\u00DA\u00FA\u00CD\u0094\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/get.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:DE0E75CFD26111E5BD95FF5C92C74483\" xmpMM:InstanceID=\"xmp.iid:DE0E75CED26111E5BD95FF5C92C74483\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:644cdf6e-7019-f243-bfe3-e692c605bf16\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x10\u0099\u00A5;\x00\x00\x00\u00E3IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x0B\u00B9\x1A\x0Bw2 \u00BB\u0088\u00B1\u00DF\x1DU\u009E\u0089\x02C\x19\u0091\u00F0\x7F\u00A0\x18\u00E5\x06\x13\x15\x14\u00E86a\x01\u00BF\u0081\u00F8=\x10\u008B\u0082\u00D4\x03\u00BD\u00FC\x17\u00EAJ\x06\u0090\u00F7\u0091\\Or\x18\u0083\u00D4\u0088\x11\b\x12\f\u00C0DF\u00F8b\x05\u00E8\u0091\u0087\u00EE\u00E2: \u00FE\u008EE_)\x1A\u009F\x13\u0088\u009B\u0080\u00861\u00C2,\x03\u00B9\x1E\u00C6\u00C7f0\u00C8\x07\u00DDhb]X\u00C4\x1A\b\x05\x05\u00C8`G \u00FE\x03\u00E5\u00CB\x01\u00B1-\x16u\u00B6P\u00B5\u00FB\u00D1\u00C4\x19\u00F1E\fH\u00F20\u0094\u00EF\u008C\u00C4F\x06 1'R\u00E2\u0082f\u00E9x\u00E8\x19Ll!t\x15\u0088\u00B9\u0081\u00F8+\u0094\x0F\u00CA\u0085\u00A1\u0094\x1A\f\u008ByP\u00E4\u00EDCJn\r\u0083&(\u00B2q\u00A8U\x03bMr\r\u00C6\u00E7=\u00E4\u00A0 \u00DA`sj\x07\x05#\u00AD\u00EA<\u009AE\x1E@\u0080\x01\x00&\u00AB1\u00B2\u00D3\x16\u00CDz\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/get_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:E26F63FAD26111E589A5838B83757294\" xmpMM:InstanceID=\"xmp.iid:E26F63F9D26111E589A5838B83757294\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:644cdf6e-7019-f243-bfe3-e692c605bf16\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u0091\x05}e\x00\x00\x00\u00E3IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x0B\u00D9:\u00DB\u00DB\u0091]\u00C4\u00C8PY\u0089\"\u00CDD\u0081\u00A1\u008CH\u00F8?P\u008C\n\x06\x13\x15\x14h6a\x01\u00BF\u0081\u00F8=\x10\u008B\u0082\u00D5WV\u00FE\u0085\u00BA\u0092\x01\u00EC}\u0084\u00EBI\x0Ec\u0090\x1A1\x02A\u0082\x01\u0098\u00C8\b_\u00EC\u00E2h\u0091\u0087\u00EE\u00E2: \u00FE\u008EE[)\x1A\u009F\x13\u0088\u009B\u0080\u00861\u00C2-\x03\u00B9\x1E\u00C6\u00C7b0\u00C8\x07\u00DDhb]X\u00C4\x1A\b\x05\x05\u00C8`G \u00FE\x03\u00E5\u00CB\x01\u00B1-\x16u\u00B6P\u00B5\u00FB\u00D1\u00C4\x19\u00F1E\fH\u00F20\u0094\u00EF\u008C\u00C4F\x06 1'R\u00A2\u0082f\u00E9x\u00E8\x19Ll!t\x15\u0088\u00B9\u0081\u00F8+\u0094\x0F\u00CA\u0085\u00A1\u0094\x1A\f\u008ByP\u00E4\u00EDCJn\r\u0083&(\u00B2q\u00A8U\x03bMr\r\u00C6\u00E7=\u00E4\u00A0 \u00DA`sj\x07\x05#\u00AD\u00EA<\u009AE\x1E@\u0080\x01\x00vJ1B\x1B\x0E\u00D1f\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/guide.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:60F18774BC3A11E59095F63D5F093424\" xmpMM:InstanceID=\"xmp.iid:60F18773BC3A11E59095F63D5F093424\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x10b\"f\x00\x00\x00LIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B@\x1B\x03\u00A6L\u0099\u00F2\u009F\x181\u00AA\u00B8\u0080\x119\x10q\u00D9\u0082\x0Errr\x18\u00E1\x1C\u0090\x01\u00E8x\u00F2\u00E4\u00C9\u00FF\u0089\x11\x03\u00E1A\x1A\x0B\u00C3 \x10\u00D5\u00D4\u00D4\u0088\x12\u00C3\u00F0\u00C2\u00D0\u008C\x05\u0080\x00\x03\x009\u00E8x\u00F3D\b\u0082\u00DE\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/guide_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:649E5753BC3A11E5B6A6D44758CFA375\" xmpMM:InstanceID=\"xmp.iid:649E5752BC3A11E5B6A6D44758CFA375\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>.)+E\x00\x00\x00CIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B@\u00B1\x01,(<WW\x18\x0B\u00E4/F4\u00B5\b\u00B1\u00DD\u00BBi\u00E5\x02\u0088-\u00D8\u00D8\u00E8b\u008C\u00B8\f`$\u00CA\x0B\u0083*\x16F\x03\x11h\u00E2\u00D0\u00CFL\x00\x01\x06\x00\u00A19\x14!\u008B\u00ACL\u009E\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/invert.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:2A14574CD26111E5AB099DC41F98FAD4\" xmpMM:InstanceID=\"xmp.iid:2A14574BD26111E5AB099DC41F98FAD4\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:644cdf6e-7019-f243-bfe3-e692c605bf16\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00BArS_\x00\x00\x00vIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\u00C0\u00D03\u0098\x05]\u00A0p'\x03Y\u0081\u00DE\u00EF\u00CE\u00C0\u0088\u00D7`(`$\u00C1\u00CC\u00FF\u00B4\b\u008A\u00FF\u00B8\x1C\u00C1B\u008Ek\u00D0\u00BD\x0F\f\u00BEA\u009E*\u00D0#\u008AZ\x063\u00D2\u00C2\u00C5\u008C\u00B4\b\nF\u008A2\b.C\u0081\u00E1\u00CA@\x0B\u0083\u00FFcKR\u00E4\x1A\u00FC\u009FT\u00EF\x13c0Q\u0086\u00E2\u00F3\x05\x0B\u00B9\u00B9\u008E`\u00A4\u008C\u00D6 47\x18 \u00C0\x00#h\x168<k\u00A3\u00BC\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/invert_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:F1A12F09D26111E5A9978A16CE54C674\" xmpMM:InstanceID=\"xmp.iid:F1A12F08D26111E5A9978A16CE54C674\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:644cdf6e-7019-f243-bfe3-e692c605bf16\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>J6\x1A\u00FA\x00\x00\x00pIDATx\u00DA\u00EC\u0095\u00C1\x0E\u0080 \fC\u00A9\u00D9O\u00EF\x0B\u00F6\u00D9\u00E5\u00E0M\x04a\u00DAD\x13{\u00E4\u00F0\u00D2v[\x00\u00C9\u00A2\u00D0VD\u00FA\x1E\u00D8\u009A\u0097\u0088\\\u00E9\u00EE\x18\u0083wa\x01IE\x15\u00EC\u0099\u00B0\u008C\u009B&~\u00C4\u00DB\u00B7\u00E20\u00A8\u00A7\u00C0P8\u0086\u00A2\n\u00DC;\u0090\x1E\u00D4\u00BD(\u00C0<[\u00A9,\u0098\u00AB\u00F1g\u00C0s\u00D0A\nK_\u00DD\u00D5P\u00FE\x1FD\x0E\u00AE\x02\f\x00d\u00E8\x168G\u00F4\u00C0\u009D\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/isolate.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00 cHRM\x00\x00z&\x00\x00\u0080\u0084\x00\x00\u00FA\x00\x00\x00\u0080\u00E8\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17p\u009C\u00BAQ<\x00\x00\x00\x06bKGD\x00\x00\x00\x00\x00\x00\u00F9C\u00BB\x7F\x00\x00\x00\tpHYs\x00\x00.#\x00\x00.#\x01x\u00A5?v\x00\x00\x00WIDAT8\u00CBc(\u00D8\u00F1\u00FF?\x03\u0095\x00\u00DC,j\x18\u008Aa\x06%\u0086\u00E2\u00D4K\u008E\u00A1\u00D4\f2\u00AC\u0080\u0091\x12['x02\x12\u00A3\u008E(\x03q\u00A9a\u00A2\u00B6\u0097G\r\x1C\t\x06\u00B2\u00E0\x10\u00FFO\u00F3,E\x16 \u00D5Ux\u00D5\u0093\u00EBE\u00AC\u00FA(\r/\x14\u00FD\u00D4\n|\u00989\x00\u00A7n@\u00E5\u00941V\u00B6\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/isolate_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x03\x00\x00\x00\u00F3j\u009C\t\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:32836BC1BC3711E5B4F3C5C01FC020AD\" xmpMM:InstanceID=\"xmp.iid:32836BC0BC3711E5B4F3C5C01FC020AD\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>?\x01\u00E1L\x00\x00\x00\x06PLTE\u00FF\u0086\u0086\u00FF\u00FF\u00FF\u00B7\u0089\u0098\u00C4\x00\x00\x00\x02tRNS\u00FF\x00\u00E5\u00B70J\x00\x00\x00CIDATx\u00DA\u00D4\u00D1a\n\x00 \b\u0083\u00D1\u00CF\u00FB_\u00BA0\bs\u00F3\x00\u00CD\x7F\u008F\b\u009C\u0084\r{<\u00A2\u009A\u0086\u00E8!\u00BA\u00BA\u009F\x0Bs\u00F3r\x7F\u00F6\x0B\u00FBu\u00EC\u00F2H\x1BZ,\u00A5r\u00ED\u009B\x18\u00AEc\u00B2\x04\x18\x00\u00AC\u00F5\x01\u00B1\u00C93\u008A\u0085\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/locked.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:F2839DFF566511E582A483D83E8DDDDD</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:ee38b5ee-6b49-a54a-847d-73cb84dd7045</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:F2839DFF566511E582A483D83E8DDDDD</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:ee38b5ee-6b49-a54a-847d-73cb84dd7045</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:57+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:12:36+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:57+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:57+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>Y\u008B\u00C8\x13\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01<IDATx\u00DA\u00BC\u0093=k\u00C2P\x14\u0086\x1F?\u00EE\u0085.\x11\x14\x0B\u00B9\u00848\u00D4\u00C5\u00D1\u00BF\u00E0(8\u00BAw\nH\u00A4\u00AB\b]\u00BB\u00B9\u00F4\x0F\u00E4\u00AF\u00C4\u00C1Qptq\u0089\u0088\u0085\x0E\u00D7\u00E9.I4\x1D\u00FA\x01\u00D5\u00D0\bB_8\u00C3=\u00E7\u00F0p\u00CEy\u00B9\u00A5,\u00CB\u00B8EenT5/\u00D9\u00EDv\u0085\u00D6\u00DAN\u0092D\x02\b!\u00E2z\u00BD\u00FE\u00B6Z\u00AD\u0092\u00AB\x00B\u0088S\x10\x04\u0091R\n\u0080\u00FD~\u00CFt:\u00AD^\u00BD\u0082\u00E7y3\u00AD5\u00BE\u00EFw|\u00DF\u00EFh\u00AD\u00F1<o\u0096\u00BBC\u0096e\x17\x11\u0086\u00E1|0\x18\u00F4\u00BF\u00DF\u00C3\u00E1\u00F01\f\u00C3y^\u00EF\u00C5\x04\u00AE\u00EB\u00BA\u00C6\u0098\u00C3r\u00B9D)\u00D5WJ\u00F5\x17\u008B\u00C5\u00BB1\u00E6\u00D0j\u00B5\u00DC\u00F3\u00FE\u00D2\u00B9\u008DA\x10\u00BC6\u009B\u00CD\u00A7\u00BCi\u00A3(z\x19\u008F\u00C7\u00CF\x7F\x1E\u00B1V\u00AB\u00DD\u00A7i\n\u0080\u00E38\x00\u00ECv;\x00l\u00DB~(t\u00E1\u00F4)\x00F\u00A3\x11\x00\u0093\u00C9\u00E4\u00A7\\\b\u00A8T*\u00E58\u008E\x010\u00C6\x00p<\x1E\x01\u0090R\u0096\x0B\x01\u0096e5\u00B4\u00D6\u00C4qL\u00AF\u00D7\x03 MS\u00A4\u0094X\u0096\u00D5(\x04l\u00B7\u00DBu\u00BB\u00DD\u00BE\u00FBr\u00E4Wm\u00B3\u00D9\u00AC\x0B]\u00F8\u00F7\u00CFt3\u00E0c\x00H\f\u0098\u00C8\u00FAd\u00E2E\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/locked_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:D2BAF922BC3911E5B24897F12813E166\" xmpMM:InstanceID=\"xmp.iid:D2BAF921BC3911E5B24897F12813E166\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x12\u00B2.I\x00\x00\x00\u009BIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u00C0\u0082!\u00E2\u00EA\n\"Y\u0081X\x12\u0088\u00D9\u00A0\u00A2\u00BF\u0080\u00F89\x10\u00FFf\u00D8\u00BD\u009B\u0080\x01\x10\u00F0\x0F\u0088\x1F\x12\u00B4\f\u008F\x17z\u00A0\u00B4&\x14#\u008B\x11e\u0080!\x10{\x03\u00F1\r(N\u0084\u008A\x11\x11\x06\f\fr@\u00FC\x1E\u00CA\u00F6\u0082\u00D2\u00AF\u00A0b \u00B9G\u0084\f(\x06\u00E2\x00(F\x07W\u0081\u00B8\u0086\u0090\x17\u00C4\u00F0\u00C4\u009A21a\u00F0\x0F\u008F\x01\u00FF\u00881\u0080\u0089\u0094\u0084\u0087M\u00B10\x1E\x03\u0084\u0089\u0089\u0085\u00EB@\u00CC\u0089\u00C3\u0080\u00EB\u00E8\x02\u008C\x03\u009E\u0099(6\x00 \u00C0\x00\u00A22\x1B\u00D8\u00E4\u00A6g\u00C5\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/motionBlur.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:82F95B4C566611E5B39DD811F990AD7C</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:c8f80fbd-131a-594e-921e-2d117f9f7dbd</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:82F95B4C566611E5B39DD811F990AD7C</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:c8f80fbd-131a-594e-921e-2d117f9f7dbd</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:48+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:16:38+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:48+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:48+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u00D8X3%\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01\u00D8IDATx\u00DA\u00C4\u0093\u00BF\u008B\u00DA\x00\x14\u00C7\u00BF\u009A\u008A \x01#V\u00DD\nA\u00837\u00D8H\x14\u00A9[\u00C0A\u00D1E\u0097\u00A2\u0083\u00D0\u00A9\u00A3th\u00FF\x0F\u00A1K\u0097\x0E\u009E`\x11\nZ\u0087\"d\x12\u00B2T\u00C4@\u00E8\"\u008A\u00A8C8\u00F0W,\u0088FCb\u00A7;\u00EE\u00A8\u00BA\u00DC\u00D0\x07oz\u00F0y_\u00DE\u00FB~-\u00A7\u00D3\t\u00CF)+\u009EY/.\r\u00C2\u00E1\u00B0s\u00B5Z\u00BD\u00B6Z\u00AD:A\x10\u00BAi\u009A6\u00C30ln\u00B7\u00FB\u00B7,\u00CB\x7F\u00AE\x028\u008Esl6\u009B\u009BT*%\x16\u008BEP\x14\u0085\u00CDf\u0083Z\u00AD\x06A\x10\u00E2\x00\u00BA\x17\x01\u00F7\u009B\x13\u0089\u0084X(\x14\u00D0\u00E9t\u00A0\u00AA*\\.\x17\u00F2\u00F9<t]\x7F\u00F3\x18`y|\u00C4H$b[.\u0097\u0091X,\u00F6\u00ABT*\u00A1\u00DDnc\u00B1X<\u00CC=\x1E\x0Fx\u009EG&\u0093\u00B1\u00FC\u00A3\u00E0~s4\x1A\x15y\u009E\x07EQP\x14\u00E5\u0089:EQ\u00E0\u00F5z\u00CF\x7FAU\u00D5\u009B`0(\u00A6\u00D3i\u00C8\u00B2\fM\u00D3\u00E0\u00F3\u00F9p<\x1E\x1F\u00DA\u00E7\u00F3\u00E1p8\u009C\x07\u00D04}\u00C7\u00B2,H\u0092\u00C4z\u00BD\u0086 \b\u00C8\u00E5r`\x18\x06\x04A\u0080a\x18\u00E4r94\x1A\u008D\u00DB\u00B3odY\u00F6\u00E3l6C(\x14\u0082\u00D3\u00E9D\u00AF\u00D7\u0083a\x18H&\u0093\u00A0(\n\u009A\u00A6\u00A1^\u00AF\x7F-\u0097\u00CB\u00EF\u00CF\x02H\u0092|\u00B5\u00DDn!I\x12\u00E2\u00F18$IB\u00BF\u00DF\u0087\u00A2(\u0088F\u00A3z\u00B7\u00DB\u00FDT\u00A9T>_4\u0092a\x18;\u0087\u00C3\u0081\u00C1`\x00\u00D34\u00C1q\x1Cx\u009E\u00C7n\u00B7\u0083(\u008A\x1F\u00AA\u00D5\u00EA\u0097\u00ABN\x1C\u008DF\u00DF\x02\u0081\u0080>\u009DN\u00DF\r\u0087C\u00CC\u00E7s\u00D04};\x1E\u008F\u00BF7\u009B\u00CD\u009F\u0097\x1C\u00FB\u00C4\x07\u00D9l6\u00E9\u00F7\u00FB\u00DF\u00DA\u00ED\u00F6\u0097\u00FB\u00FD\u00FEn2\u0099\u00FCh\u00B5Z\u00C2\u00B5,X\u00FE{\x1A\u00FF\x0E\x00<\u00BA\u00CF\u00F7\u00D5{\x03a\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/motionBlur_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:CC1A6C54BC3911E5978DB0954E5FB7F3\" xmpMM:InstanceID=\"xmp.iid:CC1A6C53BC3911E5978DB0954E5FB7F3\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>?Z\u00A7\u00A6\x00\x00\x00\u00A7IDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u00C0\x02g\u00B9\u00BA\u00A2\u00CB\u00F1\x03\u00B1.\x10\u00FF\u0086bV(\u00BE\u00CC\u00B0{\u00F7GL\x03P\x01\x17\x10k\x00\u00F1a,r\x16@|\x12\u009F\x17@6\x1B\x01\u00F1\t\x1C\u0086\u009B\u00E3\x0B\x03V<6\u00C3\u00C0D\u00ECa\u0080\u00F0\u00F3arcA\u0083T\u00CD\u00E8\x06<'R\u00CFB\\\x06\x14\x13\u00A1y\x0E\x10'\u00E02@\x0E\u008FFP:\u00C8\x07\u00E2T\u00DC\t\u0089\u0081\u00E1\x1B\x1E\x03@\u009A\u00A7\u00E3O\u0089\f\f\u00CB\u00A06\u00C5\u00A3\u00F9w5\x10o%\u009C\u0094!\u008A`\u00C9V\x04\x1A\u00A8\x1B\u0080x\x17\u00BE@a\x1C\u00F0\u00DC\b\x10`\x00\u00D8^\"\u00B7\u009C\u009E\u00B6\u00EE\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/new.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x0E\b\x06\x00\x00\x00\x1FH-\u00D1\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00 cHRM\x00\x00z&\x00\x00\u0080\u0084\x00\x00\u00FA\x00\x00\x00\u0080\u00E8\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17p\u009C\u00BAQ<\x00\x00\x00\x06bKGD\x00\x00\x00\x00\x00\x00\u00F9C\u00BB\x7F\x00\x00\x00\tpHYs\x00\x00.#\x00\x00.#\x01x\u00A5?v\x00\x00\x002IDAT(\u00CFc`\u00C0\x01\nv\u00FC\u00FF_\u00B0\u00E3\u00FF\x7F\\\u00F2L\fd\u0082\u0091\u00A0\u0091\x11_\u00C8\u00E1\x00\u00BF\u00C8\u00B5\u0091\u008D\u0081\u0081\u00E13N\u00D9\u00D1x\u00A4@#\x003\u00EF\x11\u00C9@M1n\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/new_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x03\x00\x00\x00\u00F3j\u009C\t\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:5F444975BC3711E5ACB7F8F352FEF533\" xmpMM:InstanceID=\"xmp.iid:5F444974BC3711E5ACB7F8F352FEF533\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00EDpiO\x00\x00\x00\fPLTE\u00FF\u0089\u0089\u00FF\u008F\u008F\u00FF\u0086\u0086\u00FF\u00FF\u00FF\u00BA\u00A8O\x0F\x00\x00\x00\x04tRNS\u00FF\u00FF\u00FF\x00@*\u00A9\u00F4\x00\x00\x00$IDATx\u00DAb`\u00C6\n\x18\u00A8,\u00CC\u00C44\u00F0\u00C2LH\u0080\u0081\x01\u00AB0\x13\u00E3 t7\u008Db\x07 \u00C0\x00d\u00E8\x05t\x03\u00BC_\u00B0\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/preserveTransparency.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x02\x00\x00\x00\u0090\u0091h6\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03JiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:DocumentID=\"xmp.did:2133FCEE566611E5A880C647F8B0553E\" xmpMM:InstanceID=\"xmp.iid:2133FCED566611E5A880C647F8B0553E\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3\" stRef:documentID=\"adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00D5\x17\b\x02\x00\x00\x00bIDATx\u00DAb466f \x0501\u0090\bh\u00AF\u0081\x05\u0095\u00FB\u00ED\u00ED\u00C3\u00D7_\u0090\u00F8<\u00A2\u00F2\u00C2\\\u00F84\u0098\u00A7NvWb\u00F8\u00FF\u00E7\u00E7/\x066v\x16F\u0086{;{\u00D6]FQ\u00C1\u0088-\u0094D-\u00A3\u00DD\x18v-=\u00FEzh\u0084\x12\u00A5\u00C1\n\x01\u00CC\u00EC\u009C\u009C\f\u00CC\u00D850\x0E\u0083\u00B4\x04\x10`\x00\u00A7\u00B2\x14J\u00DA\u00D2\u00A0\x1B\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/quality.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:3E4666D9566611E58E0784ADBE834C0B</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:53515e84-f562-6848-a999-0a22f4068d22</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:3E4666D9566611E58E0784ADBE834C0B</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:53515e84-f562-6848-a999-0a22f4068d22</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:40+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:14:43+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:40+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:40+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?><$\u009E\u009D\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x00\u00AFIDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u0080b\u0080\u0094\u0094\u0094\u0082\u0094\u0094\u0094\x02)\x06\u00B0 sV\u00ACX1\x01\u00CA\f \u00CB\x00\x11\x11\x11I\u0098K\x18\x18\x18\x18\u009E={\u00F6\u0080\u0090\x01\u008C\u00D8\x02q\u00F7\u00EE\u00DD\u00CB\x18\x18\x18\x18\\]]\u00A3Hr\x01\f\u0088\u0089\u0089I\x13\u00EB\x12F|\u00D1\u00B8y\u00F3\u00E6y\f\f\f\f\u00BE\u00BE\u00BEI$\u00B9\x00\x06$$$d\b\u00B9\u0084\u0091\u0098\u0084\u00B4z\u00F5\u00EA\u00A9\f\f\f\f\u00A1\u00A1\u00A1\u00D9$\u00B9\x00\x06\u00A4\u00A5\u00A5\x15p\u00B9\u0084\u0091\u0094\u00A4\u00BCd\u00C9\u0092n\x06\x06\x06\u0086\u0098\u0098\u0098R\u0092\\\x00\x03rrr\u00AAd\u0085\x01\u00FD2\x139\x000\x00\u00EB\u00D67\u00CF\u008F\u00C3\u00B3\u00ED\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/quality_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:C5E052D4BC3911E58F6DA441A478EEC2\" xmpMM:InstanceID=\"xmp.iid:C5E052D3BC3911E58F6DA441A478EEC2\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>(B\u00AF\u00B3\x00\x00\x00}IDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B\u00C0\u0082\u00C2suU\u0080\u00B2\x1E\u00E0\u00D5\u00B5{7\x0E\x03\x18\x18&@\u00E9\x00\u00F2\\\u00C0\u00C0 \t\u00A5\u0089s\t\x16\x03\u00CC\u00A1\u00F42(\x1DE\u00AA\x010 M\u00ACKp\x19`\x0F\u00A5\u00E7A\u00E9$R\r\u0080\x01\x19B.!d\u0080\x1B\u0094\u009E\n\u00A5\u00B3I5\u0080\x01\u00CD\x05\x18.!\u00D6\x00o(\u00DD\r\u00A5KI5\x00\x06T\u00D1\x05\x18\x07<3Ql\x00@\u0080\x01\x00\u00D53\x13\u00ABm\u00F4T\u009A\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/refresh.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:0AE6ECF9BC3911E58C3D89E6C139292F\" xmpMM:InstanceID=\"xmp.iid:0AE6ECF8BC3911E58C3D89E6C139292F\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00F7\u008E\u00B8M\x00\x00\x00\u00EDIDATx\u00DA\u00EC\u0095M\n\u00C20\x10\u0085;\u00B5\u00FE QA\u00F1L\u009E\u00C7\u0093x\x1E/\u00E4\u00C6\u0085\x0B\u008Bh\u00AD\u00C4\tL%\u00BE\u00A6\u00C9\u0088v\u00E7\u00C0\u0083LB>^\u00D3\u00C9\u0084\u00AC\u00B5Y\x1F\u0091g=Eo\u00E0\u00A2\x19l\u00F7\u00AD\u00B5!k\u00C5:\u00B0\b\u00E6\u00EB\x18t\u00B7\u00F1\u00C0^\fD\u00B7\u008E}wV\u00C9Z\u00CAXu\x14\u00B9\u00B8C(\u0081k\u00C3\u00AA\u00C4\u00BD\n\\\u0080\x0B\x04b\u00EE\u00E0\u0093\x14\u00D8m8A\x1E\n\x0Bk\u00C7\u00C0\u00FA\x1Bx\u00C4\u009A&\u00A0!\u00B8\u0091\x7F\u00F2\u0082\"\u00F8\u00AC\u00AC$\n\u00C0k\x0FJ\b\u00BE(\u00DD\"<4\u00FF\u00D5\x05\u00A1X\u00EE\u0083\x17\x1D.4p\u008AU\u00C5\u00F8G\u00CE[\u00E0\nKFQ\x19V{A\u009C\u00EB\u00AB\x02n\u00A1\x05$\u00C1\u00CE\u00F5\u00DAk2\u00E8\nsW\u00C3\x0Fm\u00DB,\u00A5\x07\u0094\u0089\u00CF\u00CE\u00BD\x12\u00FD\u00A8\x1F\u00CFX\u00F3\u00C0\u00BC\u0091}\u00D13\u00A6\u00FF\u00D3\u00D4\u00C4S\u0080\x01\x00\t\x0B4?\u00BC\x00o\u00D7\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/refresh_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:1194804CBC3911E5865AE58DD91B1D52\" xmpMM:InstanceID=\"xmp.iid:1194804BBC3911E5865AE58DD91B1D52\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00E8y\u00BD\x17\x00\x00\x00\u00E9IDATx\u00DA\u00EC\u0095\u00DD\n\u00C20\f\u0085\u00979\x7F\u0090\u00AA\u00A0\u00F8\u00B0{\u0082\u00BD\u00A97^x\u00E1\x10\u009D\u0093\u009AB\u009C\u00F5\u00D8\u00B5\x11\u00DD\u009D\u0081\x03MK?\u00CE\u00BA4%km6D\u00E4\u00D9@1\x18\u00B8\u00E8FU\u0085kc\u00D6\u0086\u00B5c\x11\u00CC\u00B7QjYz\u00E0g\u008CD\u0097\u009EmWV\u00CDZ\u00CBXu\x14\u00B9\u00B8C(\u0081k\u00C3j\u00C4\u00BD\n\\\u0080\x0B\x04b\u00EE\u00E0\u00B3\x14\u00D8m8@\x1E\n\x0Bk\u00FB\u00C0\u00FA\x0Bx\u00C2\u009A'\u00A0!\u00B8\u0091\x7F\u00D2A\x11|TV\x12\x05\u00E0\u00AD\x07%\x04\u009F\u0094n\x11\x1E\u009A\u00FF\u00EA\u0082P,\u00F7\u00C1\u00AB\x1E\x17\x1A8\u00C5\u00AAb\u00FA#\u00E7o\u00E0\x06KFQ\x19V{A\u009C\u00EB\u00B3\x02n\u00A1\x05$\u00C1\u00CE\u00F5\u00D6k2\u00E8\nsW\u00C37m\u00DB\u00AC\u00A5\x07\u00D4\u0089\u00CF\u00CE\u00BD\x12\u00FD\u00A8\x1F/X\u00CB\u00C0\u00BC\u0091}\u00D13\u00A6\u00FF\u00D3\u00F4\u0088\u00BB\x00\x03\x00\u00FE\u00AC4?\x1A\u00E1\u00F4+\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/remove.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:EDF6F763BC3811E59389BF19263B3B88\" xmpMM:InstanceID=\"xmp.iid:EDF6F762BC3811E59389BF19263B3B88\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>.9\x1E\u00E9\x00\x00\x00\u00C3IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\u00C0\u00D03\u0098\u00A5p'A5\u00BF\u0081\u00F8=\x10\u008B\u0082\u00D4\x03\u00F1\x1F|\u008A\u00FB\u00DD\x19\x18\x19\u00A0\n\tZ\x0E\u00C4b$\u00BB\u0098\f_2B]\u0086\x01\u0090}\u008Fnp\x1D\x10\x7F\u00C7bX)\x1A\u009F\x13\u0088\u009B\u00D0\f\u00FD\x0F\u00B3\x14\u009B\u00C1\u00A0\u00C8\u00ECF\x13\u00EB\u00C2\"\u00D6@LP8\"E\u0088\x1C\x10\u00DBbQg\x0BU\u00BB\x1F\u009B\u00B7q\x19\fr\u00FEa(\u00DF\x19\u0089\u008D\f@bN\u0084\\\u0089\x1C\u00EE\u00A39\u008F\u00E4t|\x15\u0088\u00B9\u0081\u00F8+\u0094\x0F\u00CA\u0085\u00A1\u0094\x1A\fK\u009B\u00A0\u00C8\u00DB\u0087\u0094\u00DC\x1A\x06MPd\u00E3P\u00AB\x06\u00C4\u009A\u00E4\x1A\u008C\u00CF{\u00C8AA\u00B4\u00C1\u00E6\u00D4\x0E\n\u00C6!W\u00E7\x01\x04\x18\x00\u00A1\u00A7\"1O\x05\u0096\x1F\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/remove_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:F4CA4509BC3811E5ABABC7D844A8CC1A\" xmpMM:InstanceID=\"xmp.iid:F4CA4508BC3811E5ABABC7D844A8CC1A\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>A\u00BC\u0094m\x00\x00\x00\u00C4IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\u00C0\u00D03\u0098\u0085\u00A1\u00BD\u009D\u0090\u009A\u00DF@\u00FC\x1E\u0088E\u00C1\u00EA\x19\x18\u00FE\u00E0U]Y\u00C9\u00C8\x00UH\u00D8r\x06\x061\u00D2]L:`\u0084\u00BA\fS\x06\u00C9\u00F7\u00E8\x06\u00D7\x01\u00F1w,\u0086\u0095\u00A2\u00F19\u0081\u00B8\t\u00CD\u00D0\u00FFpK\u00B1\x18\f\u008A\u00CCn4\u00B1.,b\r\u00C4\x04\u0085#R\u0084\u00C8\x01\u00B1-\x16u\u00B6P\u00B5\u00FB\u00B1y\x1B\u0097\u00C1 \u00E7\x1F\u0086\u00F2\u009D\u0091\u00D8\u00C8\x00$\u00E6D0\u00F4\u0091\u00C2}4\u00E7\u0091\u009C\u008E\u00AF\x0217\x10\x7F\u0085\u00F2A\u00B90\u0094R\u0083ai\x13\x14y\u00FB\u0090\u0092[\u00C3\u00A0\t\u008Al\x1Cj\u00D5\u0080X\u0093\\\u0083\u00F1y\x0F9(\u00886\u00D8\u009C\u00DAA\u00C18\u00E4\u00EA<\u0080\x00\x03\x00\u00FE8\"\x15h\u0097+\u00DC\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/rename.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\tpHYs\x00\x00.#\x00\x00.#\x01x\u00A5?v\x00\x00\nOiCCPPhotoshop ICC profile\x00\x00x\u00DA\u009DSgTS\u00E9\x16=\u00F7\u00DE\u00F4BK\u0088\u0080\u0094KoR\x15\b RB\u008B\u0080\x14\u0091&*!\t\x10J\u0088!\u00A1\u00D9\x15Q\u00C1\x11EE\x04\x1B\u00C8\u00A0\u0088\x03\u008E\u008E\u0080\u008C\x15Q,\f\u008A\n\u00D8\x07\u00E4!\u00A2\u008E\u0083\u00A3\u0088\u008A\u00CA\u00FB\u00E1{\u00A3k\u00D6\u00BC\u00F7\u00E6\u00CD\u00FE\u00B5\u00D7>\u00E7\u00AC\u00F3\u009D\u00B3\u00CF\x07\u00C0\b\f\u0096H3Q5\u0080\f\u00A9B\x1E\x11\u00E0\u0083\u00C7\u00C4\u00C6\u00E1\u00E4.@\u0081\n$p\x00\x10\b\u00B3d!s\u00FD#\x01\x00\u00F8~<<+\"\u00C0\x07\u00BE\x00\x01x\u00D3\x0B\b\x00\u00C0M\u009B\u00C00\x1C\u0087\u00FF\x0F\u00EAB\u0099\\\x01\u0080\u0084\x01\u00C0t\u00918K\b\u0080\x14\x00@z\u008EB\u00A6\x00@F\x01\u0080\u009D\u0098&S\x00\u00A0\x04\x00`\u00CBcb\u00E3\x00P-\x00`'\x7F\u00E6\u00D3\x00\u0080\u009D\u00F8\u0099{\x01\x00[\u0094!\x15\x01\u00A0\u0091\x00 \x13e\u0088D\x00h;\x00\u00AC\u00CFV\u008AE\x00X0\x00\x14fK\u00C49\x00\u00D8-\x000IWfH\x00\u00B0\u00B7\x00\u00C0\u00CE\x10\x0B\u00B2\x00\b\f\x000Q\u0088\u0085)\x00\x04{\x00`\u00C8##x\x00\u0084\u0099\x00\x14F\u00F2W<\u00F1+\u00AE\x10\u00E7*\x00\x00x\u0099\u00B2<\u00B9$9E\u0081[\b-q\x07WW.\x1E(\u00CEI\x17+\x146a\x02a\u009A@.\u00C2y\u0099\x192\u00814\x0F\u00E0\u00F3\u00CC\x00\x00\u00A0\u0091\x15\x11\u00E0\u0083\u00F3\u00FDx\u00CE\x0E\u00AE\u00CE\u00CE6\u008E\u00B6\x0E_-\u00EA\u00BF\x06\u00FF\"bb\u00E3\u00FE\u00E5\u00CF\u00ABp@\x00\x00\u00E1t~\u00D1\u00FE,/\u00B3\x1A\u0080;\x06\u0080m\u00FE\u00A2%\u00EE\x04h^\x0B\u00A0u\u00F7\u008Bf\u00B2\x0F@\u00B5\x00\u00A0\u00E9\u00DAW\u00F3p\u00F8~<<E\u00A1\u0090\u00B9\u00D9\u00D9\u00E5\u00E4\u00E4\u00D8J\u00C4B[a\u00CAW}\u00FEg\u00C2_\u00C0W\u00FDl\u00F9~<\u00FC\u00F7\u00F5\u00E0\u00BE\u00E2$\u00812]\u0081G\x04\u00F8\u00E0\u00C2\u00CC\u00F4L\u00A5\x1C\u00CF\u0092\t\u0084b\u00DC\u00E6\u008FG\u00FC\u00B7\x0B\u00FF\u00FC\x1D\u00D3\"\u00C4Ib\u00B9X*\x14\u00E3Q\x12q\u008ED\u009A\u008C\u00F32\u00A5\"\u0089B\u0092)\u00C5%\u00D2\u00FFd\u00E2\u00DF,\u00FB\x03>\u00DF5\x00\u00B0j>\x01{\u0091-\u00A8]c\x03\u00F6K'\x10Xt\u00C0\u00E2\u00F7\x00\x00\u00F2\u00BBo\u00C1\u00D4(\b\x03\u0080h\u0083\u00E1\u00CFw\u00FF\u00EF?\u00FDG\u00A0%\x00\u0080fI\u0092q\x00\x00^D$.T\u00CA\u00B3?\u00C7\b\x00\x00D\u00A0\u0081*\u00B0A\x1B\u00F4\u00C1\x18,\u00C0\x06\x1C\u00C1\x05\u00DC\u00C1\x0B\u00FC`6\u0084B$\u00C4\u00C2B\x10B\nd\u0080\x1Cr`)\u00AC\u0082B(\u0086\u00CD\u00B0\x1D*`/\u00D4@\x1D4\u00C0Qh\u0086\u0093p\x0E.\u00C2U\u00B8\x0E=p\x0F\u00FAa\b\u009E\u00C1(\u00BC\u0081\t\x04A\u00C8\b\x13a!\u00DA\u0088\x01b\u008AX#\u008E\b\x17\u0099\u0085\u00F8!\u00C1H\x04\x12\u008B$ \u00C9\u0088\x14Q\"K\u00915H1R\u008AT UH\x1D\u00F2=r\x029\u0087\\F\u00BA\u0091;\u00C8\x002\u0082\u00FC\u0086\u00BCG1\u0094\u0081\u00B2Q=\u00D4\f\u00B5C\u00B9\u00A87\x1A\u0084F\u00A2\x0B\u00D0dt1\u009A\u008F\x16\u00A0\u009B\u00D0r\u00B4\x1A=\u008C6\u00A1\u00E7\u00D0\u00ABh\x0F\u00DA\u008F>C\u00C70\u00C0\u00E8\x18\x073\u00C4l0.\u00C6\u00C3B\u00B18,\t\u0093c\u00CB\u00B1\"\u00AC\f\u00AB\u00C6\x1A\u00B0V\u00AC\x03\u00BB\u0089\u00F5c\u00CF\u00B1w\x04\x12\u0081E\u00C0\t6\x04wB a\x1EAHXLXN\u00D8H\u00A8 \x1C$4\x11\u00DA\t7\t\x03\u0084Q\u00C2'\"\u0093\u00A8K\u00B4&\u00BA\x11\u00F9\u00C4\x18b21\u0087XH,#\u00D6\x12\u008F\x13/\x10{\u0088C\u00C47$\x12\u0089C2'\u00B9\u0090\x02I\u00B1\u00A4T\u00D2\x12\u00D2F\u00D2nR#\u00E9,\u00A9\u009B4H\x1A#\u0093\u00C9\u00DAdk\u00B2\x079\u0094, +\u00C8\u0085\u00E4\u009D\u00E4\u00C3\u00E43\u00E4\x1B\u00E4!\u00F2[\n\u009Db@q\u00A4\u00F8S\u00E2(R\u00CAjJ\x19\u00E5\x10\u00E54\u00E5\x06e\u00982AU\u00A3\u009AR\u00DD\u00A8\u00A1T\x115\u008FZB\u00AD\u00A1\u00B6R\u00AFQ\u0087\u00A8\x134u\u009A9\u00CD\u0083\x16IK\u00A5\u00AD\u00A2\u0095\u00D3\x1Ah\x17h\u00F7i\u00AF\u00E8t\u00BA\x11\u00DD\u0095\x1EN\u0097\u00D0W\u00D2\u00CB\u00E9G\u00E8\u0097\u00E8\x03\u00F4w\f\r\u0086\x15\u0083\u00C7\u0088g(\x19\u009B\x18\x07\x18g\x19w\x18\u00AF\u0098L\u00A6\x19\u00D3\u008B\x19\u00C7T071\u00EB\u0098\u00E7\u0099\x0F\u0099oUX*\u00B6*|\x15\u0091\u00CA\n\u0095J\u0095&\u0095\x1B*/T\u00A9\u00AA\u00A6\u00AA\u00DE\u00AA\x0BU\u00F3U\u00CBT\u008F\u00A9^S}\u00AEFU3S\u00E3\u00A9\t\u00D4\u0096\u00ABU\u00AA\u009DP\u00EBS\x1BSg\u00A9;\u00A8\u0087\u00AAg\u00A8oT?\u00A4~Y\u00FD\u0089\x06Y\u00C3L\u00C3OC\u00A4Q\u00A0\u00B1_\u00E3\u00BC\u00C6 \x0Bc\x19\u00B3x,!k\r\u00AB\u0086u\u00815\u00C4&\u00B1\u00CD\u00D9|v*\u00BB\u0098\u00FD\x1D\u00BB\u008B=\u00AA\u00A9\u00A19C3J3W\u00B3R\u00F3\u0094f?\x07\u00E3\u0098q\u00F8\u009CtN\t\u00E7(\u00A7\u0097\u00F3~\u008A\u00DE\x14\u00EF)\u00E2)\x1B\u00A64L\u00B91e\\k\u00AA\u0096\u0097\u0096X\u00ABH\u00ABQ\u00ABG\u00EB\u00BD6\u00AE\u00ED\u00A7\u009D\u00A6\u00BDE\u00BBY\u00FB\u0081\x0EA\u00C7J'\\'Gg\u008F\u00CE\x05\u009D\u00E7S\u00D9S\u00DD\u00A7\n\u00A7\x16M=:\u00F5\u00AE.\u00AAk\u00A5\x1B\u00A1\u00BBDw\u00BFn\u00A7\u00EE\u0098\u009E\u00BE^\u0080\u009ELo\u00A7\u00DEy\u00BD\u00E7\u00FA\x1C}/\u00FDT\u00FDm\u00FA\u00A7\u00F5G\fX\x06\u00B3\f$\x06\u00DB\f\u00CE\x18<\u00C55qo<\x1D/\u00C7\u00DB\u00F1QC]\u00C3@C\u00A5a\u0095a\u0097\u00E1\u0084\u0091\u00B9\u00D1<\u00A3\u00D5F\u008DF\x0F\u008Ci\u00C6\\\u00E3$\u00E3m\u00C6m\u00C6\u00A3&\x06&!&KM\u00EAM\u00EE\u009ARM\u00B9\u00A6)\u00A6;L;L\u00C7\u00CD\u00CC\u00CD\u00A2\u00CD\u00D6\u00995\u009B=1\u00D72\u00E7\u009B\u00E7\u009B\u00D7\u009B\u00DF\u00B7`ZxZ,\u00B6\u00A8\u00B6\u00B8eI\u00B2\u00E4Z\u00A6Y\u00EE\u00B6\u00BCn\u0085Z9Y\u00A5XUZ]\u00B3F\u00AD\u009D\u00AD%\u00D6\u00BB\u00AD\u00BB\u00A7\x11\u00A7\u00B9N\u0093N\u00AB\u009E\u00D6g\u00C3\u00B0\u00F1\u00B6\u00C9\u00B6\u00A9\u00B7\x19\u00B0\u00E5\u00D8\x06\u00DB\u00AE\u00B6m\u00B6}agb\x17g\u00B7\u00C5\u00AE\u00C3\u00EE\u0093\u00BD\u0093}\u00BA}\u008D\u00FD=\x07\r\u0087\u00D9\x0E\u00AB\x1DZ\x1D~s\u00B4r\x14:V:\u00DE\u009A\u00CE\u009C\u00EE?}\u00C5\u00F4\u0096\u00E9/gX\u00CF\x10\u00CF\u00D83\u00E3\u00B6\x13\u00CB)\u00C4i\u009DS\u009B\u00D3Gg\x17g\u00B9s\u0083\u00F3\u0088\u008B\u0089K\u0082\u00CB.\u0097>.\u009B\x1B\u00C6\u00DD\u00C8\u00BD\u00E4Jt\u00F5q]\u00E1z\u00D2\u00F5\u009D\u009B\u00B3\u009B\u00C2\u00ED\u00A8\u00DB\u00AF\u00EE6\u00EEi\u00EE\u0087\u00DC\u009F\u00CC4\u009F)\u009EY3s\u00D0\u00C3\u00C8C\u00E0Q\u00E5\u00D1?\x0B\u009F\u00950k\u00DF\u00AC~OCO\u0081g\u00B5\u00E7#/c/\u0091W\u00AD\u00D7\u00B0\u00B7\u00A5w\u00AA\u00F7a\u00EF\x17>\u00F6>r\u009F\u00E3>\u00E3<7\u00DE2\u00DEY_\u00CC7\u00C0\u00B7\u00C8\u00B7\u00CBO\u00C3o\u009E_\u0085\u00DFC\x7F#\u00FFd\u00FFz\u00FF\u00D1\x00\u00A7\u0080%\x01g\x03\u0089\u0081A\u0081[\x02\u00FB\u00F8z|!\u00BF\u008E?:\u00DBe\u00F6\u00B2\u00D9\u00EDA\u008C\u00A0\u00B9A\x15A\u008F\u0082\u00AD\u0082\u00E5\u00C1\u00AD!h\u00C8\u00EC\u0090\u00AD!\u00F7\u00E7\u0098\u00CE\u0091\u00CEi\x0E\u0085P~\u00E8\u00D6\u00D0\x07a\u00E6a\u008B\u00C3~\f'\u0085\u0087\u0085W\u0086?\u008Ep\u0088X\x1A\u00D11\u00975w\u00D1\u00DCCs\u00DFD\u00FAD\u0096D\u00DE\u009Bg1O9\u00AF-J5*>\u00AA.j<\u00DA7\u00BA4\u00BA?\u00C6.fY\u00CC\u00D5X\u009DXIlK\x1C9.*\u00AE6nl\u00BE\u00DF\u00FC\u00ED\u00F3\u0087\u00E2\u009D\u00E2\x0B\u00E3{\x17\u0098/\u00C8]py\u00A1\u00CE\u00C2\u00F4\u0085\u00A7\x16\u00A9.\x12,:\u0096@L\u0088N8\u0094\u00F0A\x10*\u00A8\x16\u008C%\u00F2\x13w%\u008E\ny\u00C2\x1D\u00C2g\"/\u00D16\u00D1\u0088\u00D8C\\*\x1EN\u00F2H*Mz\u0092\u00EC\u0091\u00BC5y$\u00C53\u00A5,\u00E5\u00B9\u0084'\u00A9\u0090\u00BCL\rL\u00DD\u009B:\u009E\x16\u009Av m2=:\u00BD1\u0083\u0092\u0091\u0090qB\u00AA!M\u0093\u00B6g\u00EAg\u00E6fv\u00CB\u00ACe\u0085\u00B2\u00FE\u00C5n\u008B\u00B7/\x1E\u0095\x07\u00C9k\u00B3\u0090\u00AC\x05Y-\n\u00B6B\u00A6\u00E8TZ(\u00D7*\x07\u00B2geWf\u00BF\u00CD\u0089\u00CA9\u0096\u00AB\u009E+\u00CD\u00ED\u00CC\u00B3\u00CA\u00DB\u00907\u009C\u00EF\u009F\u00FF\u00ED\x12\u00C2\x12\u00E1\u0092\u00B6\u00A5\u0086KW-\x1DX\u00E6\u00BD\u00ACj9\u00B2<qy\u00DB\n\u00E3\x15\x05+\u0086V\x06\u00AC<\u00B8\u008A\u00B6*m\u00D5O\u00AB\u00EDW\u0097\u00AE~\u00BD&zMk\u0081^\u00C1\u00CA\u0082\u00C1\u00B5\x01k\u00EB\x0BU\n\u00E5\u0085}\u00EB\u00DC\u00D7\u00ED]OX/Y\u00DF\u00B5a\u00FA\u0086\u009D\x1B>\x15\u0089\u008A\u00AE\x14\u00DB\x17\u0097\x15\x7F\u00D8(\u00DCx\u00E5\x1B\u0087o\u00CA\u00BF\u0099\u00DC\u0094\u00B4\u00A9\u00AB\u00C4\u00B9d\u00CFf\u00D2f\u00E9\u00E6\u00DE-\u009E[\x0E\u0096\u00AA\u0097\u00E6\u0097\x0En\r\u00D9\u00DA\u00B4\r\u00DFV\u00B4\u00ED\u00F5\u00F6E\u00DB/\u0097\u00CD(\u00DB\u00BB\u0083\u00B6C\u00B9\u00A3\u00BF<\u00B8\u00BCe\u00A7\u00C9\u00CE\u00CD;?T\u00A4T\u00F4T\u00FAT6\u00EE\u00D2\u00DD\u00B5a\u00D7\u00F8n\u00D1\u00EE\x1B{\u00BC\u00F64\u00EC\u00D5\u00DB[\u00BC\u00F7\u00FD>\u00C9\u00BE\u00DBU\x01UM\u00D5f\u00D5e\u00FBI\u00FB\u00B3\u00F7?\u00AE\u0089\u00AA\u00E9\u00F8\u0096\u00FBm]\u00ADNmq\u00ED\u00C7\x03\u00D2\x03\u00FD\x07#\x0E\u00B6\u00D7\u00B9\u00D4\u00D5\x1D\u00D2=TR\u008F\u00D6+\u00EBG\x0E\u00C7\x1F\u00BE\u00FE\u009D\u00EFw-\r6\rU\u008D\u009C\u00C6\u00E2#pDy\u00E4\u00E9\u00F7\t\u00DF\u00F7\x1E\r:\u00DAv\u008C{\u00AC\u00E1\x07\u00D3\x1Fv\x1Dg\x1D/jB\u009A\u00F2\u009AF\u009BS\u009A\u00FB[b[\u00BAO\u00CC>\u00D1\u00D6\u00EA\u00DEz\u00FCG\u00DB\x1F\x0F\u009C4<YyJ\u00F3T\u00C9i\u00DA\u00E9\u0082\u00D3\u0093g\u00F2\u00CF\u008C\u009D\u0095\u009D}~.\u00F9\u00DC`\u00DB\u00A2\u00B6{\u00E7c\u00CE\u00DFj\x0Fo\u00EF\u00BA\x10t\u00E1\u00D2E\u00FF\u008B\u00E7;\u00BC;\u00CE\\\u00F2\u00B8t\u00F2\u00B2\u00DB\u00E5\x13W\u00B8W\u009A\u00AF:_m\u00EAt\u00EA<\u00FE\u0093\u00D3O\u00C7\u00BB\u009C\u00BB\u009A\u00AE\u00B9\\k\u00B9\u00EEz\u00BD\u00B5{f\u00F7\u00E9\x1B\u009E7\u00CE\u00DD\u00F4\u00BDy\u00F1\x16\u00FF\u00D6\u00D5\u009E9=\u00DD\u00BD\u00F3zo\u00F7\u00C5\u00F7\u00F5\u00DF\x16\u00DD~r'\u00FD\u00CE\u00CB\u00BB\u00D9w'\u00EE\u00AD\u00BCO\u00BC_\u00F4@\u00EDA\u00D9C\u00DD\u0087\u00D5?[\u00FE\u00DC\u00D8\u00EF\u00DC\x7Fj\u00C0w\u00A0\u00F3\u00D1\u00DCG\u00F7\x06\u0085\u0083\u00CF\u00FE\u0091\u00F5\u008F\x0FC\x05\u008F\u0099\u008F\u00CB\u0086\r\u0086\u00EB\u009E8>99\u00E2?r\u00FD\u00E9\u00FC\u00A7C\u00CFd\u00CF&\u009E\x17\u00FE\u00A2\u00FE\u00CB\u00AE\x17\x16/~\u00F8\u00D5\u00EB\u00D7\u00CE\u00D1\u0098\u00D1\u00A1\u0097\u00F2\u0097\u0093\u00BFm|\u00A5\u00FD\u00EA\u00C0\u00EB\x19\u00AF\u00DB\u00C6\u00C2\u00C6\x1E\u00BE\u00C9x31^\u00F4V\u00FB\u00ED\u00C1w\u00DCw\x1D\u00EF\u00A3\u00DF\x0FO\u00E4| \x7F(\u00FFh\u00F9\u00B1\u00F5S\u00D0\u00A7\u00FB\u0093\x19\u0093\u0093\u00FF\x04\x03\u0098\u00F3\u00FCc3-\u00DB\x00\x00D\x11iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:41:53+02:00</xmp:CreateDate>\n         <xmp:MetadataDate>2015-11-08T16:40:18+01:00</xmp:MetadataDate>\n         <xmp:ModifyDate>2015-11-08T16:40:18+01:00</xmp:ModifyDate>\n         <dc:format>image/png</dc:format>\n         <xmpMM:InstanceID>xmp.iid:c10670ed-3823-ca43-8a17-2a0cc1198547</xmpMM:InstanceID>\n         <xmpMM:DocumentID>adobe:docid:photoshop:fbef5450-862e-11e5-b5ad-ec40c68b82d4</xmpMM:DocumentID>\n         <xmpMM:OriginalDocumentID>xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>created</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:3101bd25-1461-b041-9196-86bfc5de21f3</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:41:53+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:d9e37bde-4973-1f4b-843b-33c5359230e7</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:44:51+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:ad28f9a1-4b29-ee42-9afc-50a1553100a3</stEvt:instanceID>\n                  <stEvt:when>2015-11-08T16:40:18+01:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>converted</stEvt:action>\n                  <stEvt:parameters>from application/vnd.adobe.photoshop to image/png</stEvt:parameters>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>derived</stEvt:action>\n                  <stEvt:parameters>converted from application/vnd.adobe.photoshop to image/png</stEvt:parameters>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:c10670ed-3823-ca43-8a17-2a0cc1198547</stEvt:instanceID>\n                  <stEvt:when>2015-11-08T16:40:18+01:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>xmp.iid:ad28f9a1-4b29-ee42-9afc-50a1553100a3</stRef:instanceID>\n            <stRef:documentID>xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3</stRef:documentID>\n            <stRef:originalDocumentID>xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3</stRef:originalDocumentID>\n         </xmpMM:DerivedFrom>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <photoshop:ICCProfile>sRGB IEC61966-2.1</photoshop:ICCProfile>\n         <photoshop:DocumentAncestors>\n            <rdf:Bag>\n               <rdf:li>7D50088F3051B24C160BB96C50DEDC3E</rdf:li>\n               <rdf:li>B57D9A8194332DD9ECBC7D03A87286E3</rdf:li>\n               <rdf:li>adobe:docid:photoshop:eb92b811-d64f-11e4-b08f-d3e95b2afe57</rdf:li>\n               <rdf:li>uuid:323CC3D69041DF11864E9A2A96CD276A</rdf:li>\n               <rdf:li>uuid:46A4F9B98841DF11864E9A2A96CD276A</rdf:li>\n               <rdf:li>xmp.did:7149452DEB7F11E492728C6206A594DE</rdf:li>\n               <rdf:li>xmp.did:84EBC989759011E3A8B4B4A885B40FE3</rdf:li>\n               <rdf:li>xmp.did:df5a325a-ee3b-614d-88c4-530ada5db8cf</rdf:li>\n            </rdf:Bag>\n         </photoshop:DocumentAncestors>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>3000000/10000</tiff:XResolution>\n         <tiff:YResolution>3000000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>1</exif:ColorSpace>\n         <exif:PixelXDimension>22</exif:PixelXDimension>\n         <exif:PixelYDimension>22</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u00D7\u00AB$T\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x00vIDATx\u00DA\u00EC\u0094\u00D1\r\u00800\bD\u00EF\u008C\u00BBu\u009EN\u00D2y:\u00DD\u00F9cL\u00A3\u0090\u00AA\x15\u00BF\u00CA\x0F\x04\u0092\u00C7\x05\b\u0094\u0084\b[\x10d\x13\x1C\x0F^G\x01\u00B9\u00E28\u00AB\u0092@\x13\u009C\u00EB+6\x01h\u00F7\u00EE(\u00D4x\x195+\x7F{\x14mw9\u008A.\nK\u00EA\u0083\u00E9\u00C4\u008AZ\x1E#\u00C0<)\u00E6S0\u00BFR\u00CC\u00D1\u00EF\u00E6\u00DD1\u00E7\u00DB\u009C\u00E0\u00FF\u00C0\x1B\x00\x00\x00\u00FF\u00FF\x03\x00U\x12\x1E/\x15\u0089&N\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/rename_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x03\x00\x00\x00\u00F3j\u009C\t\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:6B5F061ABC3711E598B1812859318174\" xmpMM:InstanceID=\"xmp.iid:6B5F0619BC3711E598B1812859318174\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>]/\u00FE\u00B7\x00\x00\x00\x06PLTE\u00FF\u0086\u0086\u00FF\u00FF\u00FF\u00B7\u0089\u0098\u00C4\x00\x00\x00\x02tRNS\u00FF\x00\u00E5\u00B70J\x00\x00\x00>IDATx\u00DAb`\u00C4\n\x18\x06\u00810\x03\x03\x03V\u00D5\f0\u0082\u0081\x11\u00A2\u0082\u0081\x01U\u0098\x01,\x05W\u0084\u00CC\x00)f\u00C0&\u008Ci6\u0092\x1B\x10\u00C28\\B\u0094\u00BB\x07M\u00C0B\x00@\u0080\x01\x00\u00BA\u00AA\x01\u00C1y\u00D3\u00D5\u00DF\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/select.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\r\x00\x00\x00\r\b\x06\x00\x00\x00r\u00EB\u00E4|\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00 cHRM\x00\x00z&\x00\x00\u0080\u0084\x00\x00\u00FA\x00\x00\x00\u0080\u00E8\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17p\u009C\u00BAQ<\x00\x00\x00\x06bKGD\x00\x00\x00\x00\x00\x00\u00F9C\u00BB\x7F\x00\x00\x00\tpHYs\x00\x00.#\x00\x00.#\x01x\u00A5?v\x00\x00\x00VIDAT(\u00CF\u0095\u00D0\u00DB\t\u00C00\fC\u00D1+\u00D3\u00E12NG\u00C98\u00DD.\u00FD*\u00A4\u00E0W\u00FC\u00AD\u0083\u008Ct?k\u00D1\u00BC9$\x00;\x05\x00\u00D7I\u00B8D^\u00F8\u00BB\u00F6{-\u0094\r\u00F4CsH\u00FB[\x11t\u009B*h^\u00B0\u0082\u00E9\x10\x114\u00AF\u00A5\u0082a8[\u00B3\u008Dv\u00F8\x02p\x14&\u00AA\u0083\u00C9*S\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/select_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x03\x00\x00\x00\u00F3j\u009C\t\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:492928B0BC3711E5B25DB835E8697DE1\" xmpMM:InstanceID=\"xmp.iid:492928AFBC3711E5B25DB835E8697DE1\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>I\u00F9\x0F<\x00\x00\x00\x06PLTE\u00FF\u0086\u0086\u00FF\u00FF\u00FF\u00B7\u0089\u0098\u00C4\x00\x00\x00\x02tRNS\u00FF\x00\u00E5\u00B70J\x00\x00\x00@IDATx\u00DAb`\u00C4\n\x18h.\u00CC\u0080\x00\u00D8\u0085\u00B1\u00AA\u00C6j\b\x0E\u00B3qY\u0089E\x18J`\n#\u008B\u00C3\u0084\u0091d1\u0084\x19\u00D1\u00BD\x03\u00D7\u00CC\u00C0\u00805L\u00A0\u00E2\x18A\u0085C\u0098\u008A\u00D1\x00\x10`\x00\u008B\u0096\x01\u0096\u00A2\x04@\u00CA\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/settings.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:B7E888E6BC3B11E5B997EA6CC7A77681\" xmpMM:InstanceID=\"xmp.iid:B7E888E5BC3B11E5B997EA6CC7A77681\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:b64a9c04-f84f-4b4d-aa29-48b0fadce681\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>Z\u008A\u0082\u00CA\x00\x00\x00sIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\u00C0\u00A8\u00C1\u00B47\u0098\x05D\x14\u00EE$K/\u00AE\u00E4\u00C4\u00D8\u00EFN\u00BE\u008B\u00FF\x13\u0092\u00C30\x18d\x1B\b\u0093`(#\x14#\u00F3!A\u0081\u00AC\u0081\u00C4`a\u00C4\u00C1\u0086\u00BB\u00F8\u00FF\u0090Kn\u008C4In\u00C8\u0086\u00C3\"\x0EOX\u00FFGc3\u00A2\u00893\u0092\x1B\x14\u008CX,\u00FAO0\u00B9\u0091i8\u0086\x1C\u00E3hy<j0\x06\x00\b0\x00\u008C\x18\x19\x02\x1B1\x19\u0098\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/settings_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:B480D813BC3B11E5A99FFF186B2850A3\" xmpMM:InstanceID=\"xmp.iid:B480D812BC3B11E5A99FFF186B2850A3\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:b64a9c04-f84f-4b4d-aa29-48b0fadce681\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>c\u0099\u00CA\u00F6\x00\x00\x00rIDATx\u00DA\u00ECT\u00D1\n\u00C0 \b\u00EC\u00C6~\u00BA/\u00E8\u00B3o#\u00DA\u0090\u009C\u00B4\t>\f\x14\fM<\u00E5:\x02\u00C9\x12a[\t\u00B2\x04\u008E\x07\u00DE\u00FB\u00D9\u009A\u00A7\u00D7\u0092\x13J\u00AD\u00EE\u008D\u00B9\u00AAi\u00E0sZ\u00F7\u00F7\u00A0\x18.\u00F3A\u0085l\u00F8F\x0B\u008C\u00F8\u00DE\u0098\u00BF\u0093\x1Bb\u00E4&\u00C1\u00AF\u0087\u00B3\u00B9\u00E6\x14c\u00BA\u0087\u0097\n<\f\u00E2Zn>pUC\u00FE\u00C7\t\u00AC\u00EC\x10`\x00\f\u00DB\x19\x1Eizhf\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/shy.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:288090F3566611E59C37DAF1D35D0DA9</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:eca819a7-8444-d341-a1be-764d992c9093</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:288090F3566611E59C37DAF1D35D0DA9</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:eca819a7-8444-d341-a1be-764d992c9093</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:34+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:14:06+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:34+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:34+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u00A8y\x0B\u00D4\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01{IDATx\u00DA\u00C4\u0093\u00B1j\u00C2P\x14\u0086\u00FF\u00C4\u00E2\u00A2\u0082\x04\u00C18\u00C4\u00C16 d\x10\x05\u00A7\x0E\u00A1.!`qQ_\u00C2\x17\u00C8\u00E8\u00E8C\x04_ \u0093\u00A0\u008BB\u00C0\u00A1\u00ABi\x05\u00C1\u00A5\x0E\u00C9\u00EEb$\u00C1po:5\x04\u00BDvq\u00E8\u0081\x0B\u00E7\x1C~~.\u00DF9\u0087\u008B\u00E3\x18\u008F\x04\u008F\x07\u00E3a\u0083'V\u00B3\u00D9l\u00E6O\u00A7\u00D3s\x14E\x02\u00CF\u00F3\x17\x00\u00C8d2~\u00A1P\u00F8v\x1C\u00C7Ok\u00B9k\x06\u008DFC8\u009F\u00CF\u00D2`0\u00F8l\u00B7\u00DBI\x7F\u00B1X`\u00B5Zu\u008A\u00C5\u00E2\u00D7v\u00BB=2\rZ\u00ADV\u00D6\u00F7\u00FD\u0097\u00F1x\u00BC\u00AB\u00D7\u00EB7?\u00DB\u00EF\u00F70\f\u00A3S*\u0095>6\u009B\u00CD\u00E5\u0086A\x10\x04UUUw\u00B2,\u00C3u]\u0098\u00A6\tB\bL\u00D3\u0084\u00EB\u00BA\u0090e\x19\u009A\u00A6\u00D9A\x10T\u0099\x10\u00C30,\x0F\u0087CPJaY\x16l\u00DB\x06\u00A5\x14\u00B6m\u00C3\u00B2,PJ\u00A1\u00EB:\u00C20,3!RJ\u00B3\u00B9\\\x0E\u0084\x10\u008CF#\x00\x00!\x04\u00D3\u00E94\u00C9EQ\x04!$\u00CB4\u0088\u00A2(\u00DF\u00EF\u00F7\u0093z2\u0099\u00A0V\u00AB\u00E1p8\u00C00\u008C\u00B44\u00CF\u0084\u00E88NR\u00CC\u00E7\u00F3\u00A3$I\u00C2\u00AF\u0081\u00E7y\u00C7n\u00B7+\u00A4F\u00CD1\u00C7\u0098\u00DE\u0085^\u00AF\u00B7SU\u00B5\u00BA^\u00AF\u00DD\u00D9l\u00A6\\\u00EF\x00\x00 \u008E\u00E3\u00BBO\u00D3\u00B4\u00D7\u00E5r\x19\u00EB\u00BA\u00FEvO\u00F3\u00A7\u0081\u00A2(b\u00A5RyW\x14E\u00BC\u00A7\u00E1\u00FE\u00FD\x1A\x7F\x06\x002\u00FF\u00F8~P\u00E9\u00DEa\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/shyIsolate.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:56C3626FBC3B11E58E45B28419393D79\" xmpMM:InstanceID=\"xmp.iid:56C3626EBC3B11E58E45B28419393D79\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>6&(\u00FF\x00\x00\x00_IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x0B\u008CQ\u00B8\u0093!\u0084\x1A\x06\u00F6\u00BB3\u00ACA1\x18\n\u00D6Phn\b\u0086\u008B\u00D1%(\x05\u008C\u00F4\b\u00E3\x15T\n\u00E3\blA\x11A\u00A1\u00B9+p\u0085\u00F1\u008A!\x15\u00C6\u00FF\u00A9\x14\u00C6\u008C \u009A\u0089\u0081F\u0080f\x06\u008F\u00A6\u00E3a\u0092\u008EG\u00CB\u00E3\u00FFC+\u00E7\x01\x04\x18\x00\u0088\u00CA''S\u00BD\u008C\u00A6\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/shyIsolate_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:50543F28BC3B11E5A630DC5E4E6C998E\" xmpMM:InstanceID=\"xmp.iid:50543F27BC3B11E5A630DC5E4E6C998E\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00CF\x0F8o\x00\x00\x00]IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x0B\u009C\u00D5\u00DE\x1EB\x15\x13++\u00D7\u00A0\x1A\f\x01k(46\x04\u00D3\u00C5h\x12\u0094\x02Fz\u0084\u00F1\n*\u0085q\x04\u00B6\u00A0\u0088\u00A0\u00D0\u00D8\x15\u00B8\u00C2x\u00C5\u0090\n\u00E3\u00FFT\ncF\x10\u00C5\u00C4@#@3\u0083G\u00D3\u00F10I\u00C7\u00A3\u00E5\u00F1\u00FF\u00A1\u0095\u00F3\x00\x02\f\x00Wj''1\u00A2\u0091\u00EF\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/shy_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:BDBAA51BBC3911E59557F8C6ECC32049\" xmpMM:InstanceID=\"xmp.iid:BDBAA51ABC3911E59557F8C6ECC32049\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>a\u00A3\u00F94\x00\x00\x00\u00A8IDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B@\u00B1\x01,(<WW\x18\u008B\x07\u0088\u0095\u0081X\b\u0088\x7FA\u00C5\u00BE\x00\u00F1](\u00CD\u00C0\u00B0{7\x16\x03 \x00\u00A4I\x16\u0088/`\u0091s\x02\u00E2\u008B@\u00FC\x0E\u0097\x17\u00D8\u0080X\x02\u0087f\x10\u00D8\x07\u00C4\u00FAPuX\r\u0090\x03\u00E2\u00AB\x04\u00BC\u00BD\x0F\u00AA\x0E\u00AB\x01\u00E2D\u0086\u009D8>/\x10\x03pz\u0081\u0087H\x03xp\x19\u00B0\t\u0089\u00FD\x0EM\u00EE\x1D6u\u00E8\x060\"ay ~\x04\x15\x7F\x04\u00E5#\u00CB\x13L\u0089\u00A0\x04\x13\x05e'\u00C0\x13\x10\u0089I\x19\u0094\u00F2\u00FC\u0080\u00F8:.\x05\u008C\x03\u009E\x1B\x01\x02\f\x00\u009B\x0E\x1D\x0B\\)\u00FB\u0080\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/small_logo.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\"\x00\x00\x00\n\b\x06\x00\x00\x00\u00D1\u00B8\u008C\u0099\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00;\u009CiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c014 79.156797, 2014/08/20-09:53:02        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmp:CreatorTool>Adobe Photoshop CC 2014 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2014-05-09T13:43:25+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-05-08T19:37:47+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-05-08T19:37:47+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <xmpMM:InstanceID>xmp.iid:a121dfa3-15c9-fd4e-98e2-e675c3d5c1b1</xmpMM:InstanceID>\n         <xmpMM:DocumentID>adobe:docid:photoshop:ec795b48-f5a8-11e4-a0dc-f596cee1464b</xmpMM:DocumentID>\n         <xmpMM:OriginalDocumentID>xmp.did:540c5986-fa89-3d4d-9fd8-8164c0403036</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>created</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:540c5986-fa89-3d4d-9fd8-8164c0403036</stEvt:instanceID>\n                  <stEvt:when>2014-05-09T13:43:25+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC (Windows)</stEvt:softwareAgent>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:b34bd3e5-1025-5a40-92b8-06848a4b535c</stEvt:instanceID>\n                  <stEvt:when>2014-05-09T15:13:57+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:a121dfa3-15c9-fd4e-98e2-e675c3d5c1b1</stEvt:instanceID>\n                  <stEvt:when>2015-05-08T19:37:47+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2014 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>34</exif:PixelXDimension>\n         <exif:PixelYDimension>10</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u00F6_Lt\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x03\u00B9IDATx\u00DA<\u0091\u00CD\u008B\x1CU\x14\u00C5\x7F\u00EF\u00BEWU\u00DD5\u00D3=\u00DD==\u00E3L2c\x12u\u0091 \x04\x11\u008CnT\u00DC\x04QA\x14Q7\"(\u00F1/p\u00A1\x0B]\u0088[A\u00DC\u00B8S\u0084\u0080\u00BA\bYH@TT4Y\u0088\u008AJDb\u00C8\u0087\u0098\u0098\u0098\u00CCL\x7FVWuU\u00BD\x0F\x17\x13\u00BCp\x16\u0087s\x16\u00E7\u009C\u00AB^\u00D8\u00B7y\u00FF\u00AB\x0F?\u00F0\u00D2X\u00DC\u00C8\u008E'A/.@\x00\u009FWx\u00AD\u00D8\u00DF\u00EF\u00F6?<{\u00FE\u00DB\u00B7O\u00FFx\x1C\u00E0\u00D8\u00E3\u00F7<\u00FA\u00FA\u0093\u0087\u009F\u00B9\u00F8\u00E7\u00E5\u00ED\u00A8\u00D7'jwpe\u0081iu\x00\u00D8\u00DCw[\u00FF\u009D\u008F\u00CF\u009Cz\u00F7\u00A3\u00AFN\x02\u00BC\u00F9\u00DA\u00D1g\u008F\u00BDx\u00E4\u00E8\u0095\u00BF\x07\u00DB\u00E5`@9\x1C\x12/\u00B5q\u00B39\x12\u00C5j\u00CFr\u00E8\u00BD\u00F5\u00FE\u00CF\u009F\u0098\u008D\u00F6\u00C2\u0091\u00C3\x07\u00EFx\u00C5e\x13l\u009A\u00A0Z-B1\u00C7FS\u0088b\x16\u00F6\u00AE\u00B2\u00FF\u00EA\u00BF{\u0080\u00E3\u0087VS\x1E\u00B9k\u00F1\u00E8\u0081}K/\u00AF\u00E9\u00BD\u00C4\u00BD\x15tw\x19\u00B4\u0081\u00B8\t\u00CE\u00C2\u00DD\u00B7\u00B3\u00FE\u00F5\u00EF\x068\u00F9\u00FC\x13\u0087x\u00EA\u00B1\u0083Oo\x1C\\{n\u00BD\x15(\u00AE[\u008C\u00E9b\u00D2\x06vV\u00A0\u00B4&I\x1D\x0F\u00DD\u00B7\u00B1mB+\u00AD\u00D1\u008A\u00F1x\n&\u0081\u00A2\u00A4\u00DC\x19`\u00EB\x1A\x1D[\x16l\u00C0zr\u0080\u0095nJ\"fN\x11\u00A8\x17\u00FAx\x1Fa\u00B2\x1A1\u008APd\x04\u00E7I\u0086\x05u1\u00CF\x0167\u00FA$\u0089\u00C9\x19\u00EC0\u00FA\u00EB_\u00BC\x07\u00B3\u0098\u00E2\u00B6rL3\u00A6\u009E\u00CDi\x07AC!*\u008A\u00C1y$\u008A\u00F1\u00CEa\u00A7\x13\u00B05\u00DE\u00D5\x04\u00AD!NP\u00A2\x01\u00B0A\u00A3Z\x1D\x10\u008F\u00CB\u00A7\u00E8$\u0086`\u00B1\u00C5\x04\u0082\u00DFE\u0099\u00A3\u00AC\x05`:\u00CD\u00A8k\u00AB\x10C\u00A3\u00BBL\u00B3\u00D7A\u00F9\x1A%\x1E%\n-\x11q\u00DAD%)\"Z\u0083\b\u00BA\u00B5\u0084\u0088 &Bi\u0083\u00F8\u0080\x16\u0081\u00B2\u00C4\x0E\u0087\x008k\u00B1y\x06U\u0085n4\b\u00F5\u009C\u00E0-\u0088\u00C2\u00D5\x15x\x0B\u00D5\f\\\u00BD\x1B\u00BC\u00AAqU\x0E\u00D4(\x03\x04\u008F\u00ABv\u00B5\u00E0=\x01G `\u009A-\x04\x11\u00D0\x11\u00E5\u00D6\r\x14\n\u00DDl#i\u009Bd\u00A9K\u00D4j\u00C3\u00CE\u00800\x19\x03\u00A0T@i\u00A0\u00B7\u008CI\x12\u00BC\u00AD\t\u00DE!\x12pU\u0086u\x15\x04 \u0084]\u00BFxT(\u00A0\u009A\x12\u00EC\fg+l9Gt\u00846\x11x\u008B\u00F7\x1E[\u00CD\x11\u009F\x17\u00B0\u00B5\u0085w\x1E\u00E7\x1Cu>%J\u009B\u00A4\u009B\u00FBq\u00C31\u008CG\u0098\u00F55\x00D\fb\fT9\u00A1\u00CCQ\u00C1\x13l\u0089-\x0BD4\u0082\u00BF\u00F5V\x07\u0080\u00D6\x11\u00A8\x18\u0082\u00A7\u009Ae\u0094\u0093\x11\u00A8\u0080-\x0B\\\u009D\x13\u0094\u00A0\u009C\u00C5N\u00B7\x10\u00F2\x19\u00CC2$\u0089\u00A8\u0086\u00DB\u00B8Y\u00B6\u00BB\u00D0`Dv\u00E9\"ln\"\u008D\x06\x00\u0089\x11\u00B4s\u0090\u00E7`-!x\b\u00A0P\u0088(\u00B0%T\u00D3\u00FF\x17I\u00D3\x04\u00AD4~\u00E2\u00A8\u00E7~\u00B7\u0088\u00F6x\u00C9\u00A9\u00CA9>X\u00F2\u00C1\u0088j<\u00C6x\u0088\u00E8\u00B4\u00E8O&\u00D8F\x03\u00D3]\u0086`\u00A9.\u00FEA\u00E7\u00C0\x01X\u00ED\x13\u009F=\u0097\x02\f\u00B29.\u0091\u0084\u0095&\x0B\u00BA\u0086\u00D6\x12(\x05\u0091\x01%\u00E0[p\u00E7:\u008D\u00DE\u00D9\x14\u00E0\u009F\u00EB#\u009C\u00D1\r\u00D9\u00DBb\u00D5\u00CD!n@'&L\x0BT\u00E6vy\u0096\x01u\u00C3|~\u00F5\u00C67\u00BD\u00EF~z\u00E3\u00C6d\u009AI\x14\u00858\u00BDF\u00B5\u00B3\u0083\u00CF3\u0092\u00C1\u009C\u00EE\u00A5+K\u00DF\u00DF\u00DC\u00FE\x05\u00E0\u00B7+#\u00DE;\u00F1\u00EB\u0089\x0B\x17nN\x0637RI\x03\x14\u00B7\u00CE\u00A0LLo\u00A5\u00DB\u00F9\u00E2\u0087\u00CBg\x00>=u\u009ER\u00E9\x0F\x1E\u00BCw\u00ED\u00DC\u00CDk\u0083\u0091^LQ\x12Q\u008F\u00C6\u0088\u00D2\x04/4\u00D4\u00B8\u00F3\u00D9\u00E9\u00ED/\u00FF\x1B\x00\u00C0j\u00DF\u0089'\u0081\u00AB\u0080\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/solo.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:EA68101D566511E5B09AD6F4C3DB611F</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:d0caf8f1-0303-f045-a518-4c6c7eb2b324</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:EA68101D566511E5B09AD6F4C3DB611F</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:d0caf8f1-0303-f045-a518-4c6c7eb2b324</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:22+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:12:22+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:22+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:22+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>\u00CF\u00BA-\u00EF\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x00\u00F7IDATx\u00DA\u00E4\u0093\u00B1j\u0084@\x10\u0086\u00FF\x15I\u00B1b\x11V\u00B2\u0085\u00BE\u00C0\x06R\x1F\u00DBi\u00EB=\u00C2\u00BE@ mJK\u00CB\u00BC\u00C3Uy\x04\u00E3\x0B,H\u009E\u00C0g\u00B8HH\u00A1\x16\u00E7\x0E\u009A.\u0084K\u008E\bW\\\u0091\x1F\u00A6\u0099\x19>\u0098\u0099\x7F\u00D8\u00B2,8G\x1E\u00CE\u00D4\u00E5\x01\u00FE\u00A9\u0082RJ\u008C\u00E3xMDW\u00BE\u00EFOA\x10|\u00B4m\u00FB\u00BE\n\u00A0\u0094\x12Z\u00EBM\u009E\u00E7U\x14E\u00E8\u00BA\x0Eu]o\u0095R\u00AF\u00C7\u0090_\x01Z\u00EB\u008D1\u00A6b\u008Ca\u009Eg\b!`\u008C\u00A9\x00l\x01\u00BC\u00FC\u00B9\u0083,\u00CB\x1E\u009Cs\u0098\u00A6\u00E9+\u009CsH\u00D3\u00F4~\u00D5\bq\x1C\u00DF\x0E\u00C3\u00F0#\u009F$\u00C9\u00DD*\x00\x11\x1D\u0088\b\u00DFM\u00C6\x18\x03\x11\x1DV\u009D\u00D1Z\u00BB\u0093R\u00EE9\u00E7\u00F0<\x0F\u009CsH)\u00F7\u00D6\u00DA\u00DDq/;e\u00E5\u00A2(\x1E\u00B5\u00D6&\f\u00C3\u009B\u00BE\u00EF\u00DF\u009A\u00A6y.\u00CB\u00F2i5\u00E0\x1F\u00FD\u00C2\u00E7\x00z\u00EFb\x06\u00F3\x1E\u00F8\u00CA\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/soloIsolate.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:5B40D5FCBC3B11E59FD49E2C47DC7A31\" xmpMM:InstanceID=\"xmp.iid:5B40D5FBBC3B11E59FD49E2C47DC7A31\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00F1;\u00B2P\x00\x00\x00\u0086IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00\x13\x03\u008D\x00\u00CD\ff\u00811\nw2\u0084\u00A0K\u00F6\u00BB3\u00AC\x01\u008A\u00AF\u00C0\"\x1E\u0081K=\u0086\u00C1P\u00B0\x06\u0089\u008D\u00AC1\x02\u0089\u00BD\u0082\b\u00F5t\fc\u00A0w\u00C0\u0098Rq\u00F4\u00A0\b\x01\u0086\x1D6\u00B0\x02\u00878.\u00F5\f\u008C\u00B4J\u00C7\u00C8\u00A9\x02W\u00EC\u00FF\u00C7\"\u00CE\u0088K=\u00AE\u00A0\u00C0\x15\u00FB\u00B8\x00N\u00F5\x03\u009F*p\x01bS\x05\u00AE\u00D8\u00C7\x05V\fh\u00AA\x18-+F\u00CB\n\x1A\u00871@\u0080\x01\x00\u00B2_I\u00CF4#\u008B\u009A\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/soloIsolate_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x16\b\x06\x00\x00\x00\u00C4\u00B4l;\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\" xmpMM:DocumentID=\"xmp.did:607407A8BC3B11E58CA9EDC042857CC5\" xmpMM:InstanceID=\"xmp.iid:607407A7BC3B11E58CA9EDC042857CC5\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:e522b956-c25a-0644-b954-3f4596036ec0\" stRef:documentID=\"xmp.did:3101bd25-1461-b041-9196-86bfc5de21f3\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00F8\u00BC\u00F3\u00EF\x00\x00\x00\u0083IDATx\u00DA\u00ECTA\n\u00C0 \f\u00D3\u00B1'z\u00F0+}\u0081_\u00E9\u00C1?v\u00820\u008A6 \u008Cn;\x18\x10J\u008CE\u00D2\u00D0(\"\u00C1\x03Gp\u0082[\u00E3\u00F3\u00AEJI\u00D3-Qm<\x1B|\u0086\u00FA\u00A9qGU\u00B5~\u0098U\u00CD\x0B\u00FA7=&\u00EA\u00E7!?Z\u0091\u009Aw\u00D6\x07\x18\u00F0H\x1F\u00A2W\u008Eu*\u00D0\u00F4\u00C5\u00E0#\u00D4\x03+\u00D0\u00F4\x11\u00A0\u00FE\x07\u00A9@XL\x05\u009A>\x02\x7F\u009A\u008A\u00BD+\u00F6\u00AEp\u00F6\u00F8\x12`\x00\u00A4\u00FCJ\u00AF\u0085\u00A7\u00DD\u00A6\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/solo_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:B6FC4E6EBC3911E5B2ACC7C2C3E62311\" xmpMM:InstanceID=\"xmp.iid:B6FC4E6DBC3911E5B2ACC7C2C3E62311\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00D0\u00A4\u00EA\u00A4\x00\x00\x00\u0084IDATx\u00DAb\u00FC\u00FF\u00FF?\x03%\u0080\u0089\u0081B0\u00F0\x06\u00B0`\x15uu\x05\u0091\u00C2@,\b\u00C4l@\u00FC\x0B\u0088\u00DF\x03\u00F1[\u0086\u00DD\u00BB\u0089r\x01H\u00B39\x10\u00DF\x06\u00E2\u00ABP\u00DA\x1C*N\u0094\x01 \u00C5[\u00D1\u00C4\u00B6B\u00C5\u00892 \x1B\u0087x\x06\u00B1\x06h\u00E1\x10\u00D7%\u00D6\u0080\u009F\u00C4\u008A\u00E32`>\x10\u00BFD\x13{\t\x15'\"\x1A\x19\x18:\u0081\u00F8/\x10G\x03\u00B1\x18\x10\u00BF\x02\u00E2\u00A5@\u00DC\u0083\u00AE\u0090q4/0\x00\x04\x18\x00\u00F5j\x1AR\u00AD;\u00AD\u009C\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/threeDLayer.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x009\u00C2iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c067 79.157747, 2015/03/30-23:40:42        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"\n            xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\"\n            xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\"\n            xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\"\n            xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\"\n            xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n            xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\"\n            xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"\n            xmlns:exif=\"http://ns.adobe.com/exif/1.0/\">\n         <xmpMM:DocumentID>xmp.did:964794B7566611E5939F83811C508288</xmpMM:DocumentID>\n         <xmpMM:InstanceID>xmp.iid:77d13187-8080-0545-8186-2400aacf2978</xmpMM:InstanceID>\n         <xmpMM:DerivedFrom rdf:parseType=\"Resource\">\n            <stRef:instanceID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:instanceID>\n            <stRef:documentID>adobe:docid:photoshop:acc9d240-5665-11e5-b12d-e0622a3347a3</stRef:documentID>\n         </xmpMM:DerivedFrom>\n         <xmpMM:OriginalDocumentID>xmp.did:964794B7566611E5939F83811C508288</xmpMM:OriginalDocumentID>\n         <xmpMM:History>\n            <rdf:Seq>\n               <rdf:li rdf:parseType=\"Resource\">\n                  <stEvt:action>saved</stEvt:action>\n                  <stEvt:instanceID>xmp.iid:77d13187-8080-0545-8186-2400aacf2978</stEvt:instanceID>\n                  <stEvt:when>2015-09-08T22:38:16+02:00</stEvt:when>\n                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Windows)</stEvt:softwareAgent>\n                  <stEvt:changed>/</stEvt:changed>\n               </rdf:li>\n            </rdf:Seq>\n         </xmpMM:History>\n         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Windows)</xmp:CreatorTool>\n         <xmp:CreateDate>2015-09-08T22:17:11+02:00</xmp:CreateDate>\n         <xmp:ModifyDate>2015-09-08T22:38:16+02:00</xmp:ModifyDate>\n         <xmp:MetadataDate>2015-09-08T22:38:16+02:00</xmp:MetadataDate>\n         <dc:format>image/png</dc:format>\n         <photoshop:ColorMode>3</photoshop:ColorMode>\n         <tiff:Orientation>1</tiff:Orientation>\n         <tiff:XResolution>720000/10000</tiff:XResolution>\n         <tiff:YResolution>720000/10000</tiff:YResolution>\n         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>\n         <exif:ColorSpace>65535</exif:ColorSpace>\n         <exif:PixelXDimension>16</exif:PixelXDimension>\n         <exif:PixelYDimension>16</exif:PixelYDimension>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>\n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                                                                                                    \n                            \n<?xpacket end=\"w\"?>C\"\u00CD@\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x01\u00D1IDATx\u00DA\u00A4\u0093O\u008B\u00DA@\x18\u00C6\x1FmbP\x14\u00B3\u00E0\u00C1%\x11\u0082\bR%h\x0E\u00C9\u00C5sP\x10\u00BC{\x11\u00F43\b=\u00F4\u00DCC?\u0085\u00B0\x17\u00EF\u0082`\r\u00E8A\u00BC\x1A\u00A4h\t\u0084\u00C2b\u00C2z\u0088\u00AC\"V\u008C\u00CA\u00F4\u00B4\u00C5\u00BFma\x1F\x18\u0098\u0099\u00F7y\x7F\u00CC3\u00C3x\b!x\u008F\u00A8\u00BF\x15S\u00A9\u00D4\u00C3v\u00BB}\u00F0\u00FB\u00FD\u00AF\u00D3\u00E9\u00F4\u00F5\u00A6\u0089\x10r5DQ\f\b\u0082\x10'\u0084\u00A0^\u00AF\x13B\b\x04A\u0088\u008B\u00A2\x18\u00B8\u00F4zN#H\u0092\u00C4,\u0097K\u00CE\u00E7\u00F3\u00FD\u00AAV\u00AB/\u00B9\\\x0E\u00F3\u00F9\x1C\u00D1h\x14\u00C3\u00E1\x10\u008DF\u00E3\u00D1u\u00DD\x00\u00CB\u00B2\u00B6\u00AE\u00EB;\x00\u00E7\u0080d2\x19-\x16\u008B/\u00AA\u00AA\u00C2\u00B2,L&\x13\u00AC\u00D7k\u0084B!\u00A4\u00D3i\u00F0<\x0FM\u00D3\u00D0n\u00B7\x1F\r\u00C3\u0098_\x01Z\u00AD\u00D64\x18\f~\u00ECv\u00BB\u00B0m\u00FB*.\u00C7qPU\x15\u009B\u00CD\u00E6G\u00A9TJ\x01\u0080\u00F7\u00ECF)\u008A\u00E9\u00F5zP\x14\x05\u008A\u00A2\u0080a\x18\u00B8\u00AE\x0B\u0086a \u00CB2dYF\u00BF\u00DF\x07EQ\u00CC\u00CDW8\x1C\x0E;\u00C30`\x18\x06\x12\u0089\x04\u00F2\u00F9<V\u00AB\x15\u00C2\u00E10F\u00A3\x11\x06\u0083\x01\x00@Q\u0094\u00DD]\u00C0\u00DB\u00DC4M\u0098\u00A6\u0089r\u00B9\u008Cf\u00B3\u0089{>\u00EFE\u00C1\u00BD\u00CC}8\x1Cpc\u00CF\u00BD\t`Y\u0096\u00A3i\u00FA\u00CC|<\x1E\u00CF\u00D64M\u0083eY\u00EEf\u0084\u00C5b\u00F1\\\u00AB\u00D5>\u00E8\u00BA\x1E\u00D5u\x1D\u00FB\u00FD\u00FE\u00CF\th\u009A\u0086$I\u00C8f\u00B3\u00B6\u00E38\u00CFo=\u009E\u00CB\u00BFP\u00A9T\u00F2\u0085B\u00E1s$\x12\u0089\u008F\u00C7c.\x16\u008Ba6\u009B!\u0093\u00C9\u00D8\u008E\u00E3\u00FC\u00ECt:_\u009E\u009E\u009E\u00BE\u00DD\x05\u009C\u0082TU\u00FD\u00C4\u00F3\u00BChY\u00D6wM\u00D3\u00BE\u009E6\u00FE\x13\u00F0\u00BF\u00F2\u00E2\u009D\u00FA=\x00\u00DCH\u00EB\x15\u0083:]\x16\x00\x00\x00\x00IEND\u00AEB`\u0082";
				scriptMng.files["/threeDLayer_o.png"] = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03niTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmpMM:OriginalDocumentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\" xmpMM:DocumentID=\"xmp.did:AFB70A17BC3911E5ABD5C1E7C36CBFD0\" xmpMM:InstanceID=\"xmp.iid:AFB70A16BC3911E5ABD5C1E7C36CBFD0\" xmp:CreatorTool=\"Adobe Photoshop CC 2015 (Windows)\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:2e8490c8-9795-5a48-b442-0cb75209c194\" stRef:documentID=\"xmp.did:88864091566611E5A96AB86EFF43FC71\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>J\u00AF0I\x00\x00\x00\u00BEIDATx\u00DAb\u00FA\u00FF\u00FF?\x03%\u0098\u0085\x01\x19\u00B8\u00BA2\u00A0\x01A(~\x0F\u00C5\b\u00B0{7\u0098ba\u00C0\x0E\u00B8\u0080X\x02\u0088\u00EF\x01\u00F1; f\x04b% ~\x01\u00C4\u00DF\u0090\x15\u00A2\x1B\u00C0\x0E\u00C4\u00D2PEw\u0091\u00C4\u00FFCiI\u00A8\u00C1O\u0081\u00F8'6\x03\x04\u00D14\u00A2\u0083\u00E7H\x06\u0081\\\u00C3\u00C0\u0084\u00A6`\x1F\x03q\x00\u00AE\u008E\t\u008B\x17\u0088\x01\u00EC\u00B8\f\u00F8I\u00A4\x01?if\u00C0/\"\r\u00F8\u0085\u00CB\x00i\"\r\u0090\u00C6e\u00C0CX\u00F4\u00E0\x01O\u00A1\u00EA\u00B0\x1A`\r\u00C4\t@|\x18\u00AA\x10]#H<\x19\u00AA\x0EgR\u00DE\t\u00C5\u00EE@\\\x0E\u00C4\u00BA@|\x19\u0088;\u00A1\u00E2(\u0080\x11\u0094\u00A3(\x01L\f\x14\x02\u0080\x00\x03\x00.\u00DCV\u00E1\u00B1\u0099\u00B8\u00E4\x00\x00\x00\x00IEND\u00AEB`\u0082";

				var duFolder = new Folder(Folder.userData.fsName + "/Duduf");
				if (!duFolder.exists) duFolder.create();
				var imgFolder = new Folder(duFolder.fsName + "/Dugr").fsName;

				for (var k in scriptMng.files)
				{
					if (scriptMng.files.hasOwnProperty(k))
					{
						if (!checkFile(imgFolder + k, scriptMng.files[k]))
						{
							alert("Error writing file: " + k);
						}
					}
				}

		}

		imgFolder = Folder.userData.absoluteURI + "/Duduf/Dugr/";

		var hideShyLayers = false;

		//========== FUNCTIONS ============

		function addLayerToGroup(layer,group)
		{
			var locked = layer.locked;
			layer.locked = false;
			var groupComment = '|' + group + '| ';
			if (layer.comment.indexOf(groupComment) < 0)
			{
			layer.comment = layer.comment + groupComment;
			}
			layer.locked = locked;
		}

		function addSelectedLayersToGroup(group)
		{
			if (group == "All") return;
			if (group == "Selected") return;
			if (group == "Not selected") return;
			if (group == "Not grouped") return;

			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem)) throw "No active comp found";

			var layers = comp.selectedLayers;
			for (var i=0;i<layers.length;i++)
			{
			addLayerToGroup(layers[i],group);
			}
		}

		function removeLayerFromGroup(layer,group)
		{
			var locked = layer.locked;
			layer.locked = false;
			layer.comment = layer.comment.replace('|' + group + '| ','');
			layer.locked = locked;
		}

		function removeSelectedLayersFromGroup(group)
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem)) throw "No active comp found";

			var layers = comp.selectedLayers;
			for (var i=0;i<layers.length;i++)
			{
			removeLayerFromGroup(layers[i],group);
			}
		}

		function removeAllLayersFromGroup(group)
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem)) throw "No active comp found";

			var layers = comp.layers;
			for (var i=1;i<=comp.numLayers;i++)
			{
			removeLayerFromGroup(layers[i],group);
			}
		}

		function addDugrLayer()
		{
			if (isolationWarningFrameList.selection.index == 0) return;

			var comp = app.project.activeItem;

			//add rect
			sq = comp.layers.addShape();
			sq.shy = true;
			sq.guideLayer = true;
			sq.name = 'Dugr Activated';
			if (isolationWarningFrameList.selection.index == 1) sq.moveToEnd();

			var gr = sq("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
			var groupContent = gr.property("ADBE Vectors Group");
			var shapeProp = groupContent.addProperty("ADBE Vector Shape - Rect");
			shapeProp("ADBE Vector Rect Size").setValue([comp.width,comp.height]);
			var stroke = groupContent.addProperty("ADBE Vector Graphic - Stroke");
			stroke("ADBE Vector Stroke Color").setValue([0.8,0,0]);
			stroke("ADBE Vector Stroke Opacity").setValue(50);
			stroke("ADBE Vector Stroke Width").setValue(comp.width/100);

			sq.locked = true;
		}

		function removeDugrLayer()
		{
			var found = false;
			var comp = app.project.activeItem;
			for (var i = 1;i<=comp.numLayers;i++)
			{
			if (comp.layer(i).name == 'Dugr Activated')
			{
				found = true;
				comp.layer(i).locked = false;
				comp.layer(i).remove();
				break;
			}
			}
			return found;
		}

		function getLayers()
		{
			var layers = [];
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem)) return layers;

			//add a layer to the list, if it has not been already added
			function addLayer(l)
			{
				var added = false;
				for (var i = 0;i<layers.length;i++ )
				{
					if (l.index == layers[i].index)
					{
						added = true;
						break;
					}
				}
				if (!added) layers.push(l);
			}

			//for each group, list layers
			if (customGroupsButton.checked && groupsList.selection)
			{
				for (var i = 0 ; i < groupsList.selection.length ; i++)
				{
					var group = groupsList.selection[i].text;

					for (var j = 1;j<=comp.numLayers;j++)
					{
						var layer = comp.layer(j);

						if (layer.comment.indexOf('|' + group + '| ')>=0)
						{
							addLayer(layer);
						}
					}
				}
			}

			if (dynamicGroupsButton.checked && dynamicGroupsList.selection)
			{
				for (var i = 0 ; i < dynamicGroupsList.selection.length ; i++)
				{
					var group = dynamicGroupsList.selection[i].text;

					for (var j = 1;j<=comp.numLayers;j++)
					{
						var layer = comp.layer(j);

						if (group == "All layers")
						{
							addLayer(layer);
						}

						else if (group == "Selected")
						{
							if (layer.selected) addLayer(layer); //TODO selected ?
						}

						else if (group == "Grouped")
						{
							var re = /\|.+\| /i;
							var comment = layer.comment.replace('|vis| ','');
							comment = comment.replace('|sel| ','');
							comment = comment.replace('|shy| ','');
							if (comment.match(re)) addLayer(layer);
						}

						else if (group == "Type: Null Objects")
						{
							if (layer.nullLayer) addLayer(layer);
						}

						else if (group == "Type: Solids")
						{
							if (layer instanceof AVLayer)
							{
								if (layer.source instanceof FootageItem)
								{
									if (layer.source.mainSource instanceof SolidSource && !layer.nullLayer) addLayer(layer);
								}
							}
						}

						else if (group == "Type: Shapes")
						{
							if (layer instanceof ShapeLayer) addLayer(layer);
						}

						else if (group == "Type: Texts")
						{
							if (layer instanceof TextLayer) addLayer(layer);
						}

						else if (group == "Type: Adjustment")
						{
							if (layer.adjustmentLayer) addLayer(layer);
						}

						else if (group == "Type: Lights")
						{
							if (layer instanceof LightLayer) addLayer(layer);
						}

						else if (group == "Type: Cameras")
						{
							if (layer instanceof CameraLayer) addLayer(layer);
						}

						else if (group == "Attribute: Visible")
						{
							if (layer.enabled) addLayer(layer);
						}

						else if (group == "Attribute: Sound")
						{
							if (layer instanceof AVLayer) if (layer.audioEnabled) addLayer(layer);
						}

						else if (group == "Attribute: Solo")
						{
							if (layer.solo) addLayer(layer);
						}

						else if (group == "Attribute: Locked")
						{
							if (layer.locked) addLayer(layer);
						}

						else if (group == "Attribute: Shy")
						{
							if (layer.shy) addLayer(layer);
						}

						else if (group == "Attribute: Effects")
						{
							if (layer.effectsActive && layer.property("ADBE Effect Parade").numProperties > 0) addLayer(layer);
						}

						else if (group == "Attribute: Motion Blur")
						{
							if (layer.motionBlur) addLayer(layer);
						}

						else if (group == "Attribute: 3D")
						{
							if (layer.threeDLayer || layer instanceof LightLayer || layer instanceof CameraLayer) addLayer(layer);
						}

						else if (group == "Attribute: Guide")
						{
							if (layer.guideLayer) addLayer(layer);
						}
					}
				}
			}

			if (invertButton.checked)
			{
				var oldLayers = layers;
				layers = [];
				for (var i = 1 ; i <= comp.numLayers;i++)
				{
					var found = false;
					for (var j = 0 ; j < oldLayers.length;j++)
					{
						if (oldLayers[j].index == i)
						{
							found = true;
							break;
						}
					}
					if (!found) addLayer(comp.layer(i));
				}
			}


			return layers;
		}

		function validateGroupName(name)
		{
			if (name == '') return false;
			if (name.indexOf('|') >= 0)
			{
				alert("Sorry, group names can not contain any vertical stroke ' | '.");
				return false;
			}
			if (name == 'shy')
			{
				alert("Sorry, group name can not be 'shy'.");
				return false;
			}
			else if (name == 'sel')
			{
				alert("Sorry, group name can not be 'sel'.");
				return false;
			}
			else if (name == 'vis')
			{
				alert("Sorry, group name can not be 'vis'.");
				return false;
			}
			else if (name == 'bes')
			{
				alert("Sorry, group name can not be 'bes'.");
				return false;
			}
			else if (name == 'dra')
			{
				alert("Sorry, group name can not be 'dra'.");
				return false;
			}
			else if (name == 'wf')
			{
				alert("Sorry, group name can not be 'wf'.");
				return false;
			}
			else if (name == 'lo')
			{
				alert("Sorry, group name can not be 'lo'.");
				return false;
			}

			//check if the group does not already exist
			for (var i = 0;i < groupsList.items.length; i++)
			{
				if (groupsList.items[i].text == name)
				{
					alert("This group already exists, please choose another name.");
					return false;
				}
			}

			return true;
		}

		function findGroups(layrs)
		{
			var layers = [];
			if (layrs instanceof LayerCollection)
			{
				for (var i = 1;i<=layrs.length;i++)
				{
					layers.push(layrs[i]);
				}
			}
			else layers = layrs;

			var groupsFound = [];
			var re = /\|[^\|\n\r]+\| /g;
			for (var i=0;i<layers.length;i++)
			{
				var layer = layers[i];
				var groups = layer.comment.match(re);
				if (!groups) continue;

				for (var j=0;j<groups.length;j++)
				{
					var group = groups[j].substring(1,groups[j].length-2);
					if (group == 'shy' || group == 'sel' || group == 'vis' || group == 'bes' || group == 'dra' || group == 'wf' || group == 'lo') continue;
					//check if the group is already listed
					var exists = false;
					for (var g=0; g<groupsFound.length; g++)
					{
						if (groupsFound[g] == group)
						{
							exists = true;
							break;
						}
					}
					//adds it
					if (!exists) groupsFound.push(group);
				}
			}
			return groupsFound;
		}

		function isolation()
		{
			exit();

			if (!groupsList.selection && customGroupsButton.checked)
			{
				return;
			}
			else if (!dynamicGroupsList.selection && dynamicGroupsButton.checked)
			{
				return;
			}

			if (isolateButton.checked) isolate();
			else if (shyIsolateButton.checked) shyI();
			else if (soloIsolateButton.checked) soloI();
		}

		function isolate()
		{
			app.beginUndoGroup('Dugr');


			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				//alert("No active composition.");
				return;
			}

			alreadyActivated = removeDugrLayer();

			if (!alreadyActivated) hideShyLayers = app.project.activeItem.hideShyLayers;

			comp.hideShyLayers = true;


			var layers = getLayers();

			for (var j = 1;j<=comp.numLayers;j++)
			{
				var layer = comp.layer(j);
				var locked = layer.locked;
				if (!alreadyActivated)
				{
					layer.locked = false;
					layer.comment = layer.comment.replace('|shy| ','');
					layer.comment = layer.comment.replace('|vis| ','');
					layer.comment = layer.comment.replace('|sel| ','');
					layer.comment = layer.comment.replace('|wf| ','');
					layer.comment = layer.comment.replace('|bes| ','');
					layer.comment = layer.comment.replace('|dra| ','');
					layer.comment = layer.comment.replace('|lo| ','');
					if (layer.shy) layer.comment = layer.comment + '|shy| ';
					if (layer.enabled) layer.comment = layer.comment + '|vis| ';
					if (layer.selected) layer.comment = layer.comment + '|sel| ';
					if (locked) layer.comment = layer.comment + '|lo| ';
					if (layer.quality == LayerQuality.WIREFRAME) layer.comment = layer.comment + '|wf| ';
					if (layer.quality == LayerQuality.BEST) layer.comment = layer.comment + '|bes| ';
					if (layer.quality == LayerQuality.DRAFT) layer.comment = layer.comment + '|dra| ';
				}

				layer.shy = true;
				if (isolationHide.value) layer.enabled = false;
				else layer.quality = LayerQuality.WIREFRAME;
				if (lockIsolatedLayers.value) layer.locked = true;
				else layer.locked = locked;
			}


			for (var i = 0 ; i< layers.length;i++)
			{
				var layer = layers[i];
				layer.shy = false;
				if (isolationHide.value) layer.enabled = true;
				else
				{
					if (layer.comment.indexOf('|dra| ') >= 0) layer.quality = LayerQuality.DRAFT;
					else if (layer.comment.indexOf('|bes| ') >= 0) layer.quality = LayerQuality.BEST;
					else if (layer.comment.indexOf('|wf| ') < 0) layer.quality = LayerQuality.DRAFT;
				}
				layer.locked = layer.comment.indexOf('|lo| ') >= 0;
			}

			addDugrLayer();

			app.endUndoGroup();
		}

		function shyI()
		{
			app.beginUndoGroup('Dugr');

			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			//alert("No active composition.");
			return;
			}

			alreadyActivated = removeDugrLayer();

			if (!alreadyActivated) hideShyLayers = app.project.activeItem.hideShyLayers;

			comp.hideShyLayers = true;

			var layers = getLayers();

			for (var j = 1;j<=comp.numLayers;j++)
			{
			var layer = comp.layer(j);
			var locked = layer.locked;
			if (!alreadyActivated)
			{
				layer.locked = false;
				layer.comment = layer.comment.replace('|shy| ','');
				layer.comment = layer.comment.replace('|vis| ','');
				layer.comment = layer.comment.replace('|sel| ','');
				layer.comment = layer.comment.replace('|wf| ','');
				layer.comment = layer.comment.replace('|bes| ','');
				layer.comment = layer.comment.replace('|dra| ','');
				layer.comment = layer.comment.replace('|lo| ','');
				if (layer.shy) layer.comment = layer.comment + '|shy| ';
				if (layer.enabled) layer.comment = layer.comment + '|vis| ';
				if (layer.selected) layer.comment = layer.comment + '|sel| ';
				if (locked) layer.comment = layer.comment + '|lo| ';
				if (layer.quality == LayerQuality.WIREFRAME) layer.comment = layer.comment + '|wf| ';
				if (layer.quality == LayerQuality.BEST) layer.comment = layer.comment + '|bes| ';
				if (layer.quality == LayerQuality.DRAFT) layer.comment = layer.comment + '|dra| ';
			}

			layer.shy = true;
			if (lockIsolatedLayers.value) layer.locked = true;
			else layer.locked = locked;

			}

			for (var i = 0 ; i< layers.length;i++)
			{
				layers[i].shy = false;
				layers[i].locked = layers[i].comment.indexOf('|lo| ') >= 0;
			}

			addDugrLayer();

			app.endUndoGroup();
		}

		function soloI()
		{
			app.beginUndoGroup('Dugr');


			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			//alert("No active composition.");
			return;
			}

			alreadyActivated = removeDugrLayer();

			if (!alreadyActivated) hideShyLayers = app.project.activeItem.hideShyLayers;

			comp.hideShyLayers = true;

			var layers = getLayers();

			for (var j = 1;j<=comp.numLayers;j++)
			{
				var layer = comp.layer(j);
				var locked = layer.locked;
				if (!alreadyActivated)
				{
					layer.locked = false;
					layer.comment = layer.comment.replace('|shy| ','');
					layer.comment = layer.comment.replace('|vis| ','');
					layer.comment = layer.comment.replace('|sel| ','');
					layer.comment = layer.comment.replace('|wf| ','');
					layer.comment = layer.comment.replace('|bes| ','');
					layer.comment = layer.comment.replace('|dra| ','');
					layer.comment = layer.comment.replace('|lo| ','');
					if (layer.shy) layer.comment = layer.comment + '|shy| ';
					if (layer.enabled) layer.comment = layer.comment + '|vis| ';
					if (layer.selected) layer.comment = layer.comment + '|sel| ';
					if (locked) layer.comment = layer.comment + '|lo| ';
					if (layer.quality == LayerQuality.WIREFRAME) layer.comment = layer.comment + '|wf| ';
					if (layer.quality == LayerQuality.BEST) layer.comment = layer.comment + '|bes| ';
					if (layer.quality == LayerQuality.DRAFT) layer.comment = layer.comment + '|dra| ';
				}

				if (isolationHide.value) layer.enabled = false;
				else layer.quality = LayerQuality.WIREFRAME;
				if (lockIsolatedLayers.value) layer.locked = true;
				else layer.locked = locked;
			}


			for (var i = 0 ; i< layers.length;i++)
			{
				var layer = layers[i];
				if (isolationHide.value) layer.enabled = true;
				else
				{
					if (layer.comment.indexOf('|dra| ') >= 0) layer.quality = LayerQuality.DRAFT;
					else if (layer.comment.indexOf('|bes| ') >= 0) layer.quality = LayerQuality.BEST;
					else if (layer.comment.indexOf('|wf| ') < 0) layer.quality = LayerQuality.DRAFT;
				}
				layer.locked = layer.comment.indexOf('|lo| ') >= 0;
			}

			addDugrLayer();

			app.endUndoGroup();
		}

		function exit()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				//alert("No active composition.");
				return;
			}

			if (!removeDugrLayer()) return;

			comp.hideShyLayers = hideShyLayers;

			for (var i = 1;i<=comp.numLayers;i++)
			{
				var layer = comp.layer(i);

				var locked = layer.locked = layer.comment.indexOf('|lo| ') >= 0;
				layer.locked = false;

				layer.shy = layer.comment.indexOf('|shy| ') >= 0;
				layer.enabled = layer.comment.indexOf('|vis| ') >= 0;
				layer.selected = layer.comment.indexOf('|sel| ') >= 0;
				if (layer.comment.indexOf('|dra| ') >= 0) layer.quality = LayerQuality.DRAFT;
				else if (layer.comment.indexOf('|bes| ') >= 0) layer.quality = LayerQuality.BEST;
				else if (layer.comment.indexOf('|wf| ') >= 0) layer.quality = LayerQuality.WIREFRAME;
				else layer.quality = LayerQuality.DRAFT;

				layer.comment = layer.comment.replace('|shy| ','');
				layer.comment = layer.comment.replace('|vis| ','');
				layer.comment = layer.comment.replace('|sel| ','');
				layer.comment = layer.comment.replace('|bes| ','');
				layer.comment = layer.comment.replace('|dra| ','');
				layer.comment = layer.comment.replace('|wf| ','');
				layer.comment = layer.comment.replace('|lo| ','');

				layer.locked = locked;

			}
		}


		//=========== UI ACTIONS ==========

		//create group
		function createGroup()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem)) return;

			var newGroupName = nameEdit.text;
			if (!validateGroupName(newGroupName)) return;

			app.beginUndoGroup("Dugr - Add group");

			addSelectedLayersToGroup(newGroupName);

			app.endUndoGroup();

			//ajouter le groupe
			groupsList.add('item',newGroupName);
			nameEdit.text = "New group...";
		}

		//remove group
		function removeGroup()
		{
			var removedGroups = [];
			if (!groupsList.selection) return;

			for (var i = 0 ; i< groupsList.selection.length;i++)
			{
				removedGroups.push(groupsList.selection[i].text);
			}

			app.beginUndoGroup("Dugr - Remove group");

			for (var i = 0;i< removedGroups.length ; i++)
			{
				var group = removedGroups[i];

				groupsList.remove(group);

				var comp = app.project.activeItem;
				if (!(comp instanceof CompItem)) continue;

				removeAllLayersFromGroup(group);
			}

			app.endUndoGroup();
		}

		//rename group
		function renameGroup()
		{
			if (!groupsList.selection) return;

			var oldName = groupsList.selection[0].text;
			var newName = nameEdit.text;

			if (!validateGroupName(newName)) return;

			if (oldName == newName) return;

			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem)) return;

			app.beginUndoGroup("Dugr - Rename group");

			for (var i = 1 ; i <= comp.numLayers ; i++)
			{
				var layer = comp.layer(i);
				layer.comment = layer.comment.replace('|' + oldName + '| ','|' + newName + '| ');
			}

			app.endUndoGroup();

			refresh();
		}

		//refresh
		function refresh(force)
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem) && !force)
			{
				alert("Please select the composition from which you want to get existing groups");
				return;
			}

			//remove old items
			groupsList.removeAll();


			if (!(comp instanceof CompItem)) return;

			//regexp to find groups
			var groupsFound = findGroups(comp.layers);

			//add groups
			for (var i = 0;i<groupsFound.length;i++)
			{
				groupsList.add('item',groupsFound[i]);
			}
		}

		//add layers to selected groups
		function addLayersToGroups()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("Please select the layers you want to add to the group(s).");
				return;
			}

			if (!groupsList.selection) return;

			app.beginUndoGroup("Dugr - Add layers to group");
			for (var i = 0 ; i < groupsList.selection.length ; i++)
			{
				addSelectedLayersToGroup(groupsList.selection[i].text);
			}
			app.endUndoGroup();
		}

		//remove layers from selected groups
		function removeLayersFromGroups()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("Please select the layers you want to remove from the group(s).");
				return;
			}


			if (!groupsList.selection) return;
			app.beginUndoGroup("Dugr - Remove layers from group");
			for (var i = 0 ; i < groupsList.selection.length ; i++)
			{
				removeSelectedLayersFromGroup(groupsList.selection[i].text);
			}
			app.endUndoGroup();
		}

		function getFromLayerButtonClicked()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("Please select the layer(s) from which you want to get existing groups");
				return;
			}


			var groupsFound = findGroups(comp.selectedLayers);

			//unselect previsously selected groups
			groupsList.selection = null;
			//select groups
			for (var i = 0;i<groupsFound.length;i++)
			{
				var group = groupsFound[i];
				for (var j = 0;j<groupsList.items.length;j++)
				{
					var item = groupsList.items[j];
					if (item.text == group) item.selected = true;
				}
			}


		}

		function isolateButtonClicked()
		{
			if (isolateButton.checked)
			{
				shyIsolateButton.setChecked(false);
				soloIsolateButton.setChecked(false);
			}

			isolation();
		}

		function shyIsolateButtonClicked()
		{

			if (shyIsolateButton.checked)
			{
				isolateButton.setChecked(false);
				soloIsolateButton.setChecked(false);
			}

			isolation();

		}

		function soloIsolateButtonClicked()
		{

			if (soloIsolateButton.checked)
			{
				shyIsolateButton.setChecked(false) ;
				isolateButton.setChecked(false);
			}

			isolation();
		}

		function groupsListChanged()
		{
			isolation();
		}

		function dynamicGroupsListChanged()
		{
			isolation();
		}

		function invertButtonClicked()
		{
			isolation();
		}

		function select()
		{
			app.beginUndoGroup('Dugr');

			if ( (!groupsList.selection && customGroupsButton.checked) || (!dynamicGroupsList.selection && dynamicGroupsButton.checked) )
			{
			alert("Please select the group(s) to isolate.");
			return;
			}

			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			alert("No active composition.");
			return;
			}


			for (var j = 1;j<=comp.numLayers;j++)
			{
			var layer = comp.layer(j);

			layer.selected = false;
			}

			var layers = getLayers();
			for (var i = 0 ; i< layers.length;i++)
			{
			layers[i].selected = true;
			}

			app.endUndoGroup();
		}

		function invert()
		{
			groupsList.items[0].selected = false;
			groupsList.items[1].selected = false;
			groupsList.items[2].selected = false;

			for (var i = 3 ; i<groupsList.items.length ; i++)
			{
			groupsList.items[i].selected = !groupsList.items[i].selected;
			}
		}

		//======== ATTRIBUTES ACTIONS =========

		function enabled()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;

			var enabled = !layers[0].enabled;

			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
				layers[i].enabled = enabled;
			}
			app.endUndoGroup();
		}

		function audioEnabled()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			alert("No active composition.");
			return;
			}

			var layers = getLayers();

			if (!layers.length) return;
			var audioEnabled = !layers[0].audioEnabled;

			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
			layers[i].audioEnabled = audioEnabled;
			}
			app.endUndoGroup();
		}

		function solo()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;
			var solo = -1;
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0, num = layers.length ; i < num ; i++)
			{
				if (!layers[i].enabled) continue;
				if (solo === -1) solo = !layers[i].solo;
				layers[i].solo = solo;
			}
			app.endUndoGroup();
		}

		function locked()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;
			var locked = !layers[0].locked;
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
				layers[i].locked = locked;
			}
			app.endUndoGroup();
		}

		function shy()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;
			var shy = !layers[0].shy;
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
				layers[i].shy = shy;
			}
			app.endUndoGroup();
		}

		function collapseTransformation()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;

			var collapseTransformation = false;
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (layers[i].canSetCollapseTransformation && !(layers[i].locked && lockedLayersDeny.value))
				{
					collapseTransformation = !layers[i].collapseTransformation;
					break;
				}
			}

			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (layers[i].canSetCollapseTransformation)
				{
					if (lockedLayersAllow.value)
					{
						var locked = layers[i].locked;
						layers[i].locked = false;
					}
					else if (layers[i].locked) continue;
					else locked = false;

					layers[i].collapseTransformation = collapseTransformation;
					layers[i].locked = locked;
				}
			}
			app.endUndoGroup();
		}

		function quality()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			alert("No active composition.");
			return;
			}

			var layers = getLayers();

			if (!layers.length) return;

			var quality = layers[0].quality;
			if (quality == LayerQuality.BEST) quality = LayerQuality.DRAFT;
			else if (quality == LayerQuality.DRAFT) quality = LayerQuality.WIREFRAME;
			else if (quality == LayerQuality.WIREFRAME) quality = LayerQuality.BEST;

			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
			layers[i].quality = quality;
			}
			app.endUndoGroup();
		}

		function effectsActive()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			alert("No active composition.");
			return;
			}

			var layers = getLayers();

			if (!layers.length) return;
			var effectsActive = !layers[0].effectsActive;
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
			layers[i].effectsActive = effectsActive;
			}
			app.endUndoGroup();
		}

		function frameBlending()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			alert("No active composition.");
			return;
			}

			var layers = getLayers();

			if (!layers.length) return;

			var frameBlending = layers[0].frameBlendingType;
			if (frameBlending == FrameBlendingType.PIXEL_MOTION) frameBlending = FrameBlendingType.FRAME_MIX;
			else if (frameBlending == FrameBlendingType.FRAME_MIX) frameBlending = FrameBlendingType.NO_FRAME_BLEND;
			else if (frameBlending == FrameBlendingType.NO_FRAME_BLEND) frameBlending = FrameBlendingType.PIXEL_MOTION;
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
			layers[i].frameBlendingType = frameBlending;
			}
			app.endUndoGroup();
		}

		function motionBlur()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
			alert("No active composition.");
			return;
			}

			var layers = getLayers();

			if (!layers.length) return;
			var motionBlur = !layers[0].motionBlur;
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
			layers[i].motionBlur = motionBlur;
			}
			app.endUndoGroup();
		}

		function adjustmentLayer()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;

			var adjustmentLayer = false;
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (!(layers[i].locked && lockedLayersDeny.value) || lockedLayersAllow.value)
				{
					adjustmentLayer = !layers[i].adjustmentLayer;
					break;
				}
			}
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (lockedLayersAllow.value)
				{
					var locked = layers[i].locked;
					layers[i].locked = false;
				}
				else if (layers[i].locked) continue;
				else locked = false;

				layers[i].adjustmentLayer = adjustmentLayer;
				layers[i].locked = locked;
			}
			app.endUndoGroup();
		}

		function threeDLayer()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;

			var threeDLayer = false;
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (!(layers[i].locked && lockedLayersDeny.value) || lockedLayersAllow.value)
				{
					threeDLayer = !layers[i].threeDLayer;
					break;
				}
			}
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (lockedLayersAllow.value)
				{
					var locked = layers[i].locked;
					layers[i].locked = false;
				}
				else if (layers[i].locked) continue;
				else locked = false;

				layers[i].threeDLayer = threeDLayer;
				layers[i].locked = locked;
			}
			app.endUndoGroup();
		}

		function guideLayer()
		{
			var comp = app.project.activeItem;
			if (!(comp instanceof CompItem))
			{
				alert("No active composition.");
				return;
			}

			var layers = getLayers();

			if (!layers.length) return;

			var guideLayer = false;
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (!(layers[i].locked && lockedLayersDeny.value) || lockedLayersAllow.value)
				{
					guideLayer = !layers[i].guideLayer;
					break;
				}
			}
			app.beginUndoGroup("Dugr - Attributes change");
			for (var i = 0 ; i < layers.length ; i++)
			{
				if (lockedLayersAllow.value)
				{
					var locked = layers[i].locked;
					layers[i].locked = false;
				}
				else if (layers[i].locked) continue;
				else locked = false;

				layers[i].guideLayer = guideLayer;
				layers[i].locked = locked;
			}
			app.endUndoGroup();
		}

		//========= PANEL SELECTOR ============
		function dynamicGroupsButtonClicked()
		{
			if (dynamicGroupsButton.checked)
			{
				customGroupsButton.setChecked(false);
				settingsButton.setChecked(false);
				isolateButton.setChecked(false);
				shyIsolateButton.setChecked(false);
				soloIsolateButton.setChecked(false);
				exit();
			}
			else
			{
				dynamicGroupsButton.setChecked(true);
			}
			dynamicPanel.show();
			customPanel.hide();
			settingsPanel.hide();
		}

		function customGroupsButtonClicked()
		{
			if (customGroupsButton.checked)
			{
				isolateButton.setChecked(false);
				shyIsolateButton.setChecked(false);
				soloIsolateButton.setChecked(false);
				exit();
				dynamicGroupsButton.setChecked(false);
				settingsButton.setChecked(false);
			}
			else
			{
				customGroupsButton.setChecked(true);
			}
			dynamicPanel.hide();
			customPanel.show();
			settingsPanel.hide();
			refresh(true);
		}

		function settingsButtonClicked()
		{
			if (settingsButton.checked)
			{
				customGroupsButton.setChecked(false);
				dynamicGroupsButton.setChecked(false);
			}
			else
			{
				settingsButton.setChecked(true);
			}
			dynamicPanel.hide();
			customPanel.hide();
			settingsPanel.show();
		}

		function lockedLayersClicked()
		{
			if (lockedLayersAllow.value) app.settings.saveSetting('dugr','lockedLayersDeny','0');
			else app.settings.saveSetting('dugr','lockedLayersDeny','1');
		}

		function isolationWarningFrameChanged()
		{
			app.settings.saveSetting('dugr','warningFrame',isolationWarningFrameList.selection.index);
		}

		function isolationTypeClicked()
		{
			if (isolationHide.value) app.settings.saveSetting('dugr','isolationType','0');
			else app.settings.saveSetting('dugr','isolationType','1');
		}

		function lockIsolatedLayersClicked()
		{
			if (lockIsolatedLayers.value) app.settings.saveSetting('dugr','lockIsolatedLayers','1');
			else app.settings.saveSetting('dugr','lockIsolatedLayers','0');
		}

		//=========== UI ===========
		{

			function addImageButton(container,text,image,helpTip,imageOver)
			{
				if (!container) return null;
				if (!text) text = '';
				if (!image) image = '';
				if (!helpTip) helpTip = '';
				if (!imageOver) imageOver = '';

				if (text == '' && image == '') return null;

				var imageButton = {};

				imageButton.standardImage = image;
				imageButton.imageOver = imageOver;
				imageButton.onClick = function () {};

				var group = container.add('group');
				group.orientation = 'row';
				group.margins = 0;
				group.spacing = 2;
				group.alignment = ['fill','fill'];
				imageButton.group = group;


				if (text != '')
				{
					var label = group.add('statictext',undefined,text);
					label.helpTip = helpTip;
					label.alignment = ['center','center'];
					imageButton.label = label;
				}

				if (image != '')
				{
					var icon = group.add('image',undefined,image);
					icon.alignment = ['center','center'];
					icon.helpTip = helpTip;
					imageButton.image = icon;
				}

				function clicked(e)
				{
					imageButton.onClick();
				}
				function mouseOver(e)
				{
					if (aeVersion >= 11 && aeVersion < 12) return; //Bugs on CS6
					if (icon) if (imageButton.imageOver != '') icon.image = imageButton.imageOver;
				}
				function mouseOut(e)
				{
					if (aeVersion >= 11 && aeVersion < 12) return; //Bugs on CS6
					if (icon) if (imageButton.standardImage != '') icon.image = imageButton.standardImage;
				}

				group.addEventListener("mousedown",clicked,true);
				group.addEventListener("mouseover",mouseOver);
				group.addEventListener("mouseout",mouseOut);

				return imageButton;
			}

			function addImageCheckBox(container,text,image,helpTip,imageChecked,imageOver)
			{
				if (!container) return null;
				if (!text) text = '';
				if (!image) image = '';
				if (!helpTip) helpTip = '';
				if (!imageChecked) imageChecked = '';
				if (!imageOver) if (imageChecked != '') imageOver = imageChecked else imageOver = '';


				if (text == '' && image == '') return null;

				var imageButton = {};

				imageButton.standardImage = image;
				imageButton.imageOver = imageOver;
				imageButton.imageChecked = imageChecked;
				imageButton.onClick = function () {};
				imageButton.checked = false;

				var group = container.add('group');
				group.orientation = 'row';
				group.margins = 0;
				group.spacing = 2;
				group.alignment = ['fill','fill'];
				imageButton.group = group;


				if (text != '')
				{
					if (image != '')
					{
						var label = group.add('statictext',undefined,text);
						label.helpTip = helpTip;
						label.alignment = ['center','center'];
						imageButton.label = label;
					}
					else
					{
						var label = group.add('checkbox',undefined,text);
						label.helpTip = helpTip;
						label.alignment = ['center','center'];
						imageButton.label = label;
					}

				}

				if (image != '')
				{
					var icon = group.add('image',undefined,image);
					icon.alignment = ['center','center'];
					icon.helpTip = helpTip;
					imageButton.image = icon;
				}

				imageButton.setChecked = function (c)
				{
					imageButton.checked = c;
					if (imageButton.imageChecked != '')
					{
						if (imageButton.checked)
						{
							if (icon) if (imageButton.imageChecked != '') icon.image = imageButton.imageChecked;
						}
						else
						{
							if (icon) if (imageButton.standardImage != '') icon.image = imageButton.standardImage;
						}
					}
				}

				imageButton.clicked = function (e)
				{
					if (imageButton.imageChecked != '')
					{
						if (imageButton.checked)
						{
							if (icon) if (imageButton.standardImage != '') icon.image = imageButton.standardImage;
							imageButton.checked = false;
						}
						else
						{
							if (icon) if (imageButton.imageChecked != '') icon.image = imageButton.imageChecked;
							imageButton.checked = true;
						}
					}
					imageButton.onClick();
				}
				imageButton.mouseOver = function (e)
				{
					if (aeVersion >= 11 && aeVersion < 12) return; //Bugs on CS6
					if (icon) if (imageButton.imageOver != '') icon.image = imageButton.imageOver;
				}
				imageButton.mouseOut = function (e)
				{
					if (aeVersion >= 11 && aeVersion < 12) return; //Bugs on CS6
					if (imageButton.checked)
					{
						if (icon) if (imageButton.imageChecked != '') icon.image = imageButton.imageChecked;
					}
					else
					{
						if (icon) if (imageButton.standardImage != '') icon.image = imageButton.standardImage;
					}
				}

				group.addEventListener("mousedown",imageButton.clicked,true);
				group.addEventListener("mouseover",imageButton.mouseOver);
				group.addEventListener("mouseout",imageButton.mouseOut);

				return imageButton;
			}


			//TODO create libduf.jsxinc, and use it with Duik and Dugr

			var  myPal = null;
			thisObj instanceof Panel ? myPal = thisObj : myPal = new Window('palette',"Dugr",undefined, {resizeable:true});

			if (myPal == null) return null;

			// Paramètres de marges et alignements du contenu
			myPal.alignChildren = ['fill','fill'];
			myPal.margins = 5;
			myPal.spacing = 2;

			var topButtons = myPal.add('group');
			topButtons.alignment = ['fill','top'];
			topButtons.alignChildren = ['fill','bottom'];
			topButtons.margins = 0;
			topButtons.spacing = 2;
			topButtons.maximumSize = [138,24];

			var isolateButton = addImageCheckBox(topButtons,'',imgFolder + 'isolate.png',"Isolate selected groups",imgFolder + 'isolate_o.png');
			isolateButton.group.size = [24,24];
			isolateButton.onClick = isolateButtonClicked;
			var shyIsolateButton = addImageCheckBox(topButtons,'',imgFolder + 'shyIsolate.png',"Isolate selected groups in the time-line only",imgFolder + 'shyIsolate_o.png');
			shyIsolateButton.size = [24,24];
			shyIsolateButton.onClick = shyIsolateButtonClicked;
			var soloIsolateButton = addImageCheckBox(topButtons,'',imgFolder + 'soloIsolate.png',"Isolate selected groups in the composition panel only",imgFolder + 'soloIsolate_o.png');
			soloIsolateButton.size = [24,24];
			soloIsolateButton.onClick = soloIsolateButtonClicked;

			var attributesGroup = myPal.add('group');
			attributesGroup.alignment = ['center','top'];
			attributesGroup.alignChildren = ['left','fill'];
			attributesGroup.margins = 0;
			attributesGroup.spacing = 2;

			var enabledButton = addImageButton(attributesGroup,'',imgFolder + 'enabled.png','',imgFolder + 'enabled_o.png');
			enabledButton.maximumSize = [18,18];
			enabledButton.onClick = enabled;
			var audioEnabledButton = addImageButton(attributesGroup,'',imgFolder + 'audioEnabled.png','',imgFolder + 'audioEnabled_o.png');
			audioEnabledButton.maximumSize = [18,18];
			audioEnabledButton.onClick = audioEnabled;
			var soloButton = addImageButton(attributesGroup,'',imgFolder + 'solo.png','',imgFolder + 'solo_o.png');
			soloButton.maximumSize = [18,18];
			soloButton.onClick = solo;
			var lockedButton = addImageButton(attributesGroup,'',imgFolder + 'locked.png','',imgFolder + 'locked_o.png');
			lockedButton.maximumSize = [18,18];
			lockedButton.onClick = locked;
			var shyButton = addImageButton(attributesGroup,'',imgFolder + 'shy.png','',imgFolder + 'shy_o.png');
			shyButton.maximumSize = [18,18];
			shyButton.onClick = shy;
			var collapseTransformationButton = addImageButton(attributesGroup,'',imgFolder + 'collapseTransformation.png','',imgFolder + 'collapseTransformation_o.png');
			collapseTransformationButton.maximumSize = [18,18];
			collapseTransformationButton.onClick = collapseTransformation;
			var guideButton = addImageButton(attributesGroup,'',imgFolder + 'guide.png','',imgFolder + 'guide_o.png');
			guideButton.maximumSize = [18,18];
			guideButton.onClick = guideLayer;

			var attributesGroup2 = myPal.add('group');
			attributesGroup2.alignment = ['center','top'];
			attributesGroup2.alignChildren = ['left','fill'];
			attributesGroup2.margins = 0;
			attributesGroup2.spacing = 2;

			var qualityButton = addImageButton(attributesGroup2,'',imgFolder + 'quality.png','',imgFolder + 'quality_o.png');
			qualityButton.maximumSize = [18,18];
			qualityButton.onClick = quality;
			var effectsActiveButton = addImageButton(attributesGroup2,'',imgFolder + 'effectsActive.png','',imgFolder + 'effectsActive_o.png');
			effectsActiveButton.maximumSize = [18,18];
			effectsActiveButton.onClick = effectsActive;
			var frameBlendingButton = addImageButton(attributesGroup2,'',imgFolder + 'frameBlending.png','',imgFolder + 'frameBlending_o.png');
			frameBlendingButton.maximumSize = [18,18];
			frameBlendingButton.onClick = frameBlending;
			var motionBlurButton = addImageButton(attributesGroup2,'',imgFolder + 'motionBlur.png','',imgFolder + 'motionBlur_o.png');
			motionBlurButton.maximumSize = [18,18];
			motionBlurButton.onClick = motionBlur;
			var adjustmentLayerButton = addImageButton(attributesGroup2,'',imgFolder + 'adjustmentLayer.png','',imgFolder + 'adjustmentLayer_o.png');
			adjustmentLayerButton.maximumSize = [18,18];
			adjustmentLayerButton.onClick = adjustmentLayer;
			var threeDLayerButton = addImageButton(attributesGroup2,'',imgFolder + 'threeDLayer.png','',imgFolder + 'threeDLayer_o.png');
			threeDLayerButton.maximumSize = [18,18];
			threeDLayerButton.onClick = threeDLayer;

			var topButtons2 = myPal.add('group');
			topButtons2.alignment = ['fill','top'];
			topButtons2.alignChildren = ['fill','bottom'];
			topButtons2.margins = 0;
			topButtons2.spacing = 2;
			topButtons2.maximumSize = [118,24];

			var invertButton = addImageCheckBox(topButtons2,'',imgFolder + 'invert.png',"Not!",imgFolder + 'invert_o.png')
			invertButton.size = [24,24];
			invertButton.onClick = invertButtonClicked;

			var selectButton = addImageButton(topButtons2,'',imgFolder + 'select.png',"Select layers in the groups", imgFolder + 'select_o.png');
			selectButton.size = [24,24];
			selectButton.onClick = select;

			var mainPanel = myPal.add('group');
			mainPanel.orientation = 'stack';
			mainPanel.margins = 0;
			mainPanel.spacing = 0;
			mainPanel.alignChildren = ['fill','fill'];

			var dynamicPanel = mainPanel.add('group');
			dynamicPanel.alignment = ['fill','fill'];
			dynamicPanel.orientation = 'column';
			dynamicPanel.alignChildren = ['fill','fill'];
			dynamicPanel.margins = 0;
			dynamicPanel.spacing = 0;

			var dynamicGroupsList = dynamicPanel.add('listbox',undefined,"Groups",{multiselect: true});
			//init
			dynamicGroupsList.add('item',"All layers");
			dynamicGroupsList.add('item',"Selected");
			dynamicGroupsList.add('item',"Grouped");
			dynamicGroupsList.add('item',"Type: Null Objects");
			dynamicGroupsList.add('item',"Type: Solids");
			dynamicGroupsList.add('item',"Type: Shapes");
			dynamicGroupsList.add('item',"Type: Texts");
			dynamicGroupsList.add('item',"Type: Adjustment");
			dynamicGroupsList.add('item',"Type: Lights");
			dynamicGroupsList.add('item',"Type: Cameras");
			dynamicGroupsList.add('item',"Attribute: Visible");
			dynamicGroupsList.add('item',"Attribute: Sound");
			dynamicGroupsList.add('item',"Attribute: Solo");
			dynamicGroupsList.add('item',"Attribute: Locked");
			dynamicGroupsList.add('item',"Attribute: Shy");
			dynamicGroupsList.add('item',"Attribute: Effects");
			dynamicGroupsList.add('item',"Attribute: Motion Blur");
			dynamicGroupsList.add('item',"Attribute: 3D");
			dynamicGroupsList.add('item',"Attribute: Guide");

			dynamicGroupsList.onChange = dynamicGroupsListChanged;

			var customPanel = mainPanel.add('group');
			customPanel.orientation = 'column';
			customPanel.alignChildren = ['fill','fill'];
			customPanel.margins = 0;
			customPanel.spacing = 2;
			customPanel.hide();

			var groupsList = customPanel.add('listbox',undefined,"Groups",{multiselect: true});
			groupsList.onChange = groupsListChanged;

			var bottomButtons2 = customPanel.add('group');
			bottomButtons2.alignment = ['fill','bottom'];
			bottomButtons2.alignChildren = ['fill','fill'];
			bottomButtons2.margins = 0;
			bottomButtons2.spacing = 2;
			bottomButtons2.maximumSize = [138,24];

			var addLayerButton = addImageButton(bottomButtons2,'',imgFolder + 'add.png',"Add selected layers to selected groups",imgFolder + 'add_o.png');
			addLayerButton.onClick = addLayersToGroups;
			addLayerButton.size = [22,22];
			var removeLayerButton = addImageButton(bottomButtons2,'',imgFolder + 'remove.png',"Remove selected layers from selected groups",imgFolder + 'remove_o.png');
			removeLayerButton.onClick = removeLayersFromGroups;
			removeLayerButton.size = [22,22];
			var getFromLayerButton = addImageButton(bottomButtons2,'',imgFolder + 'get.png',"Get groups from selected layers",imgFolder + 'get_o.png');
			getFromLayerButton.size = [22,22];
			getFromLayerButton.onClick = getFromLayerButtonClicked;

			var nameEdit = customPanel.add('edittext',undefined,"New group...");
			nameEdit.alignment = ['fill','bottom'];
			nameEdit.onActivate = function(){nameEdit.text = '';};
			nameEdit.helpTip = "The name of a new group";
			nameEdit.maximumSize = [138,24];

			function nameEditKeyDown(e)
			{
				if (e.keyName == 'Enter') createGroup();
			}

			nameEdit.addEventListener('keydown',nameEditKeyDown);

			var bottomButtons = customPanel.add('group');
			bottomButtons.alignment = ['fill','bottom'];
			bottomButtons.alignChildren = ['fill','fill'];
			bottomButtons.margins = 0;
			bottomButtons.spacing = 2;
			bottomButtons.maximumSize = [138,24];

			var addButton = addImageButton(bottomButtons,'',imgFolder + 'new.png',"Create a new group",imgFolder + 'new_o.png');
			addButton.size = [22,22];
			addButton.onClick = createGroup;
			var renameButton = addImageButton(bottomButtons,'',imgFolder + 'rename.png',"Rename selected group",imgFolder + 'rename_o.png');
			renameButton.size = [22,22];
			renameButton.onClick = renameGroup;
			var removeButton = addImageButton(bottomButtons,'',imgFolder + 'delete.png',"Remove selected groups",imgFolder + 'delete_o.png');
			removeButton.size = [22,22];
			removeButton.onClick = removeGroup;
			var refreshButton = addImageButton(bottomButtons,'',imgFolder + 'refresh.png',"Reload group(s) from current composition",imgFolder + 'refresh_o.png');
			refreshButton.size = [22,22];
			refreshButton.onClick = refresh;

			//SETTINGS Panel
			var settingsPanel = mainPanel.add('group');
			settingsPanel.alignment = ['fill','fill'];
			settingsPanel.orientation = 'column';
			settingsPanel.alignChildren = ['left','top'];
			settingsPanel.margins = 0;
			settingsPanel.spacing = 2;
			settingsPanel.hide();

			//Allow to modify locked layers' attributes
			settingsPanel.add('statictext',undefined,"• " + "Locked layers:");
			var lockedLayersSettings = settingsPanel.add('group');
			lockedLayersSettings.orientation = 'column';
			lockedLayersSettings.margins = 0;
			lockedLayersSettings.spacing = 0;
			lockedLayersSettings.alignChildren = ['left','center'];
			var lockedLayersAllow = lockedLayersSettings.add('radiobutton',undefined,"Allow changes");
			var lockedLayersDeny = lockedLayersSettings.add('radiobutton',undefined,"Deny changes");
			if (app.settings.getSetting('dugr', 'lockedLayersDeny') == 0) lockedLayersAllow.value = true;
			else lockedLayersDeny.value = true;
			lockedLayersAllow.onClick = lockedLayersClicked;
			lockedLayersDeny.onClick = lockedLayersClicked;

			//Isolation red warning : none, below, above (can mess up expressions and effects using layer indices)
			settingsPanel.add('statictext',undefined,"• " + "Isolation warning frame:");
			var isolationWarningFrameList = settingsPanel.add('dropdownlist',undefined,["None","Below","Above"]);
			isolationWarningFrameList.selection = app.settings.getSetting('dugr', 'warningFrame');
			isolationWarningFrameList.onChange = isolationWarningFrameChanged;

			//isolation wireframe or not
			settingsPanel.add('statictext',undefined,"• " + "Isolation type:");
			var isolationTypeSettings = settingsPanel.add('group');
			isolationTypeSettings.orientation = 'column';
			isolationTypeSettings.margins = 0;
			isolationTypeSettings.spacing = 0;
			isolationTypeSettings.alignChildren = ['left','center'];
			var isolationHide = isolationTypeSettings.add('radiobutton',undefined,"Hide layers");
			var isolationWireFrame = isolationTypeSettings.add('radiobutton',undefined,"Use wireframe");
			if (app.settings.getSetting('dugr', 'isolationType') == 0) isolationHide.value = true;
			else isolationWireFrame.value = true;
			isolationHide.onClick = isolationTypeClicked;
			isolationWireFrame.onClick = isolationTypeClicked;

			//lock isolated layers
			settingsPanel.add('statictext',undefined,"• " + "Isolated layers:");
			var lockIsolatedLayers = settingsPanel.add('checkbox',undefined,"Lock");
			if (app.settings.getSetting('dugr', 'lockIsolatedLayers') == 1) lockIsolatedLayers.value = true;
			else lockIsolatedLayers.value = false;
			lockIsolatedLayers.onClick = lockIsolatedLayersClicked;

			var panelSelectorGroup = myPal.add('group');
			panelSelectorGroup.alignment = ['fill','bottom'];
			panelSelectorGroup.alignChildren = ['fill','bottom'];
			panelSelectorGroup.margins = 0;
			panelSelectorGroup.spacing = 2;
			panelSelectorGroup.maximumSize = [118,24];

			var dynamicGroupsButton = addImageCheckBox(panelSelectorGroup,'',imgFolder + 'dynamic.png',"Dynamic groups",imgFolder + 'dynamic_o.png');
			dynamicGroupsButton.onClick = dynamicGroupsButtonClicked;
			dynamicGroupsButton.setChecked(true);

			var customGroupsButton = addImageCheckBox(panelSelectorGroup,'',imgFolder + 'custom.png',"Custom groups",imgFolder + 'custom_o.png');
			customGroupsButton.onClick = customGroupsButtonClicked;

			var settingsButton = addImageCheckBox(panelSelectorGroup,'',imgFolder + 'settings.png',"Settings",imgFolder + 'settings_o.png');
			settingsButton.onClick = settingsButtonClicked;

			var bottomGroup = myPal.add("group");
			bottomGroup.alignment = ["fill","bottom"];
			bottomGroup.alignChildren = ['center','bottom'];
			var dudufURL = bottomGroup.add ("statictext",undefined,"duduf.net");
			dudufURL.alignment = ["left","bottom"];
			bottomGroup.add("image",undefined,imgFolder + "small_logo.png");
			var dudufText = bottomGroup.add ("statictext",undefined,"v" + version);
			dudufText.alignment = ["right","bottom"];

			//load groups
			refresh(true);


			// On définit le layout et on redessine la fenètre quand elle est resizée
			myPal.layout.layout(true);
			myPal.layout.resize();
			myPal.onResizing = myPal.onResize = function () {this.layout.resize();}
		}


		return myPal;
	} //FONCTION DugrUI



	// On execute la creation de l'UI
	var myPalette = DugrUI(obj);
	// Si c'est une fenetre (pas lance depuis ScriptUI Panels) il faut l'afficher
	if (myPalette != null && myPalette instanceof Window) {
	//myPalette.center();
	myPalette.show();
	}

})(this);
