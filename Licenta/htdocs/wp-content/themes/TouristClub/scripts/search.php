<?php
$server = "localhost";
$user = "root";
$password = "";
$db = "licenta";

$con = mysql_connect($server,$user,$password); 

if (!$con) {
    die("database connection error");
} else {

mysql_select_db($db, $con);

sleep( 1 );
// no term passed - just exit early with no response
if (empty($_GET['term'])) exit ;
$q = strtolower($_GET["term"]);
// remove slashes if they were magically added
if (get_magic_quotes_gpc()) $q = stripslashes($q);

$items = array(
"Abrud"=>"Abrud",
"Adjud"=>"Adjud",
"Agnita"=>"Agnita",
"Aiud"=>"Aiud",
"Alba Iulia"=>"Alba Iulia",
"Alesd"=>"Alesd",
"Alexandria"=>"Alexandria",
"Amara"=>"Amara",
"Anina"=>"Anina",
"Aninoasa"=>"Aninoasa",
"Arad"=>"Arad",
"Ardud"=>"Ardud",
"Avrig"=>"Avrig",
"Azuga"=>"Azuga",
"Babadag"=>"Babadag",
"Babeni"=>"Babeni",
"Bacau"=>"Bacau",
"Baia de Arama"=>"Baia de Arama",
"Baia de Aries"=>"Baia de Aries",
"Baia Mare"=>"Baia Mare",
"Baia Sprie"=>"Baia Sprie",
"Baicoi"=>"Baicoi",
"Baile Govora"=>"Baile Govora",
"Baile Herculane"=>"Baile Herculane",
"Baile Olanesti"=>"Baile Olanesti",
"Baile Tusnad"=>"Baile Tusnad",
"Bailesti"=>"Bailesti",
"Balan"=>"Balan",
"Balcesti"=>"Balcesti",
"Bals"=>"Bals",
"Baneasa"=>"Baneasa",
"Baraolt"=>"Baraolt",
"Barlad"=>"Barlad",
"Bechet"=>"Bechet",
"Beclean"=>"Beclean",
"Beius"=>"Beius",
"Berbesti"=>"Berbesti",
"Beresti"=>"Beresti",
"Bicaz"=>"Bicaz",
"Bistrita"=>"Bistrita",
"Blaj"=>"Blaj",
"Bocsa"=>"Bocsa",
"Boldesti-Scaeni"=>"Boldesti-Scaeni",
"Bolintin-Vale"=>"Bolintin-Vale",
"Borsa"=>"Borsa",
"Borsec"=>"Borsec",
"Botosani"=>"Botosani",
"Brad"=>"Brad",
"Bragadiru"=>"Bragadiru",
"Braila"=>"Braila",
"Brasov"=>"Brasov",
"Breaza"=>"Breaza",
"Brezoi"=>"Brezoi",
"Brosteni"=>"Brosteni",
"Bucecea"=>"Bucecea",
"Bucuresti"=>"Bucuresti",
"Budesti"=>"Budesti",
"Buftea"=>"Buftea",
"Buhusi"=>"Buhusi",
"Bumbesti-Jiu"=>"Bumbesti-Jiu",
"Busteni"=>"Busteni",
"Buzau"=>"Buzau",
"Buzias"=>"Buzias",
"Cajvana"=>"Cajvana",
"Calafat"=>"Calafat",
"Calan"=>"Calan",
"Calarasi"=>"Calarasi",
"Calimanesti"=>"Calimanesti",
"Campeni"=>"Campeni",
"Campia Turzii"=>"Campia Turzii",
"Campina"=>"Campina",
"Campulung Moldovenesc"=>"Campulung Moldovenesc",
"Campulung"=>"Campulung",
"Caracal"=>"Caracal",
"Caransebes"=>"Caransebes",
"Carei"=>"Carei",
"Cavnic"=>"Cavnic",
"Cazanesti"=>"Cazanesti",
"Cehu Silvaniei"=>"Cehu Silvaniei",
"Cernavoda"=>"Cernavoda",
"Chisineu-Cris"=>"Chisineu-Cris",
"Chitila"=>"Chitila",
"Ciacova"=>"Ciacova",
"Cisnadie"=>"Cisnadie",
"Cluj-Napoca"=>"Cluj-Napoca",
"Codlea"=>"Codlea",
"Comanesti"=>"Comanesti",
"Comarnic"=>"Comarnic",
"Constanta"=>"Constanta",
"Copsa Mica"=>"Copsa Mica",
"Corabia"=>"Corabia",
"Costesti"=>"Costesti",
"Covasna"=>"Covasna",
"Craiova"=>"Craiova",
"Cristuru Secuiesc"=>"Cristuru Secuiesc",
"Cugir"=>"Cugir",
"Curtea de Arges"=>"Curtea de Arges",
"Curtici"=>"Curtici",
"Dabuleni"=>"Dabuleni",
"Darabani"=>"Darabani",
"Darmanesti"=>"Darmanesti",
"Dej"=>"Dej",
"Deta"=>"Deta",
"Deva"=>"Deva",
"Dolhasca"=>"Dolhasca",
"Dorohoi"=>"Dorohoi",
"Draganesti-Olt"=>"Draganesti-Olt",
"Dragasani"=>"Dragasani",
"Dragomiresti"=>"Dragomiresti",
"Drobeta-Turnu Severin"=>"Drobeta-Turnu Severin",
"Dumbraveni"=>"Dumbraveni",
"Eforie"=>"Eforie",
"Fagaras"=>"Fagaras",
"Faget"=>"Faget",
"Falticeni"=>"Falticeni",
"Faurei"=>"Faurei",
"Fetesti"=>"Fetesti",
"Fieni"=>"Fieni",
"Fierbinti-Targ"=>"Fierbinti-Targ",
"Filiasi"=>"Filiasi",
"Flamanzi"=>"Flamanzi",
"Focsani"=>"Focsani",
"Frasin"=>"Frasin",
"Fundulea"=>"Fundulea",
"Gaesti"=>"Gaesti",
"Galati"=>"Galati",
"Gataia"=>"Gataia",
"Geoagiu"=>"Geoagiu",
"Gheorgheni"=>"Gheorgheni",
"Gherla"=>"Gherla",
"Ghimbav"=>"Ghimbav",
"Giurgiu"=>"Giurgiu",
"Gura Humorului"=>"Gura Humorului",
"Harlau"=>"Harlau",
"Harsova"=>"Harsova",
"Hateg"=>"Hateg",
"Horezu"=>"Horezu",
"Huedin"=>"Huedin",
"Hunedoara"=>"Hunedoara",
"Husi"=>"Husi",
"Ianca"=>"Ianca",
"Iasi"=>"Iasi",
"Iernut"=>"Iernut",
"Ineu"=>"Ineu",
"Insuratei"=>"Insuratei",
"Intorsura Buzaului"=>"Intorsura Buzaului",
"Isaccea"=>"Isaccea",
"Jibou"=>"Jibou",
"Jimbolia"=>"Jimbolia",
"Lehliu Gara"=>"Lehliu Gara",
"Lipova"=>"Lipova",
"Liteni"=>"Liteni",
"Livada"=>"Livada",
"Ludus"=>"Ludus",
"Lugoj"=>"Lugoj",
"Lupeni"=>"Lupeni",
"Macin"=>"Macin",
"Magurele"=>"Magurele",
"Mangalia"=>"Mangalia",
"Marasesti"=>"Marasesti",
"Marghita"=>"Marghita",
"Medgidia"=>"Medgidia",
"Medias"=>"Medias",
"Miercurea Ciuc"=>"Miercurea Ciuc",
"Miercurea Nirajului"=>"Miercurea Nirajului",
"Miercurea Sibiului"=>"Miercurea Sibiului",
"Mihailesti"=>"Mihailesti",
"Milisauti"=>"Milisauti",
"Mioveni"=>"Mioveni",
"Mizil"=>"Mizil",
"Moinesti"=>"Moinesti",
"Moldova Noua"=>"Moldova Noua",
"Moreni"=>"Moreni",
"Motru"=>"Motru",
"Murfatlar"=>"Murfatlar",
"Murgeni"=>"Murgeni",
"Nadlac"=>"Nadlac",
"Nasaud"=>"Nasaud",
"Navodari"=>"Navodari",
"Negresti"=>"Negresti",
"Negresti-Oas"=>"Negresti-Oas",
"Negru Voda"=>"Negru Voda",
"Nehoiu"=>"Nehoiu",
"Novaci"=>"Novaci",
"Nucet"=>"Nucet",
"Ocna Mures"=>"Ocna Mures",
"Ocna Sibiului"=>"Ocna Sibiului",
"Ocnele Mari"=>"Ocnele Mari",
"Odobesti"=>"Odobesti",
"Odorheiu Secuiesc"=>"Odorheiu Secuiesc",
"Oltenita"=>"Oltenita",
"Onesti"=>"Onesti",
"Oradea"=>"Oradea",
"Orastie"=>"Orastie",
"Oravita"=>"Oravita",
"Orsova"=>"Orsova",
"Otelu Rosu"=>"Otelu Rosu",
"Otopeni"=>"Otopeni",
"Ovidiu"=>"Ovidiu",
"Panciu"=>"Panciu",
"Pancota"=>"Pancota",
"Pantelimon"=>"Pantelimon",
"Pascani"=>"Pascani",
"Patarlagele"=>"Patarlagele",
"Pecica"=>"Pecica",
"Petrila"=>"Petrila",
"Petrosani"=>"Petrosani",
"Piatra Neamt"=>"Piatra Neamt",
"Piatra-Olt"=>"Piatra-Olt",
"Pitesti"=>"Pitesti",
"Ploiesti"=>"Ploiesti",
"Plopeni"=>"Plopeni",
"Podu Iloaiei"=>"Podu Iloaiei",
"Pogoanele"=>"Pogoanele",
"Popesti-Leordeni"=>"Popesti-Leordeni",
"Potcoava"=>"Potcoava",
"Predeal"=>"Predeal",
"Pucioasa"=>"Pucioasa",
"Racari"=>"Racari",
"Radauti"=>"Radauti",
"Ramnicu Sarat"=>"Ramnicu Sarat",
"Rasnov"=>"Rasnov",
"Recas"=>"Recas",
"Reghin"=>"Reghin",
"Resita"=>"Resita",
"Roman"=>"Roman",
"Rosiorii de Vede"=>"Rosiorii de Vede",
"Rovinari"=>"Rovinari",
"Roznov"=>"Roznov",
"Rupea"=>"Rupea",
"Sacele"=>"Sacele",
"Sacueni"=>"Sacueni",
"Salcea"=>"Salcea",
"Saliste"=>"Saliste",
"Salistea de Sus"=>"Salistea de Sus",
"Salonta"=>"Salonta",
"Sangeorgiu de Padure"=>"Sangeorgiu de Padure",
"Sangeorz-Bai"=>"Sangeorz-Bai",
"Sannicolau Mare"=>"Sannicolau Mare",
"Santana"=>"Santana",
"Sarmasu"=>"Sarmasu",
"Satu Mare"=>"Satu Mare",
"Saveni"=>"Saveni",
"Scornicesti"=>"Scornicesti",
"Sebes"=>"Sebes",
"Sebis"=>"Sebis",
"Segarcea"=>"Segarcea",
"Seini"=>"Seini",
"Sfantu Gheorghe"=>"Sfantu Gheorghe",
"Sibiu"=>"Sibiu",
"Sighetu Marmatiei"=>"Sighetu Marmatiei",
"Sighisoara"=>"Sighisoara",
"Simeria"=>"Simeria",
"simleu Silvaniei"=>"simleu Silvaniei",
"Sinaia"=>"Sinaia",
"Siret"=>"Siret",
"Slanic"=>"Slanic",
"Slanic-Moldova"=>"Slanic-Moldova",
"Slatina"=>"Slatina",
"Slobozia"=>"Slobozia",
"Solca"=>"Solca",
"somcuta Mare"=>"somcuta Mare",
"Sovata"=>"Sovata",
"stefanesti Arges"=>"stefanesti Arges",
"stefanesti Botosani"=>"stefanesti Botosani",
"stei"=>"stei",
"Strehaia"=>"Strehaia",
"Suceava"=>"Suceava",
"Sulina"=>"Sulina",
"Talmaciu"=>"Talmaciu",
"tandarei"=>"tandarei",
"Targoviste"=>"Targoviste",
"Targu Bujor"=>"Targu Bujor",
"Targu Carbunesti"=>"Targu Carbunesti",
"Targu Frumos"=>"Targu Frumos",
"Targu Jiu"=>"Targu Jiu",
"Targu Lapus"=>"Targu Lapus",
"Targu Mures"=>"Targu Mures",
"Targu Neamt"=>"Targu Neamt",
"Targu Ocna"=>"Targu Ocna",
"Targu Secuiesc"=>"Targu Secuiesc",
"Tarnaveni"=>"Tarnaveni",
"Tasnad"=>"Tasnad",
"Tautii-Magheraus"=>"Tautii-Magheraus",
"Techirghiol"=>"Techirghiol",
"Tecuci"=>"Tecuci",
"Teius"=>"Teius",
"ticleni"=>"ticleni",
"Timisoara"=>"Timisoara",
"Tismana"=>"Tismana",
"Titu"=>"Titu",
"Toplita"=>"Toplita",
"Topoloveni"=>"Topoloveni",
"Tulcea"=>"Tulcea",
"Turceni"=>"Turceni",
"Turda"=>"Turda",
"Turnu Magurele"=>"Turnu Magurele",
"Ulmeni"=>"Ulmeni",
"Ungheni"=>"Ungheni",
"Uricani"=>"Uricani",
"Urlati"=>"Urlati",
"Urziceni"=>"Urziceni",
"Valea lui Mihai"=>"Valea lui Mihai",
"Valenii de Munte"=>"Valenii de Munte",
"Vanju Mare"=>"Vanju Mare",
"Vascau"=>"Vascau",
"Vaslui"=>"Vaslui",
"Vatra Dornei"=>"Vatra Dornei",
"Vicovu de Sus"=>"Vicovu de Sus",
"Victoria"=>"Victoria",
"Videle"=>"Videle",
"Viseu de Sus"=>"Viseu de Sus",
"Vlahita"=>"Vlahita",
"Voluntari"=>"Voluntari",
"Vulcan"=>"Vulcan",
"Zalau"=>"Zalau",
"Zarnesti"=>"Zarnesti",
"Zimnicea"=>"Zimnicea",
"Zlatna"=>"Zlatna"	
);



$posturi= mysql_query("SELECT * FROM wp_posts p
LEFT OUTER JOIN wp_term_relationships r ON r.object_id = p.ID
LEFT OUTER JOIN wp_term_taxonomy x ON x.term_taxonomy_id = r.term_taxonomy_id
LEFT OUTER JOIN wp_terms t ON t.term_id = x.term_id
WHERE p.post_status = 'publish'
AND p.post_type = 'post'
AND t.slug = 'hotel'");
while ($postul = mysql_fetch_array($posturi))
	{
		$orase= mysql_query("SELECT * FROM wp_postmeta WHERE post_id=".$postul['ID']." and meta_key='oras' ");
			while ($oras = mysql_fetch_array($orase))
			{			
				$formulare = mysql_query("SELECT * FROM wp_frm_items WHERE post_id=".$postul['ID']);
				while ($formular = mysql_fetch_array($formulare)) {
						$items[$postul['post_title'].', '.$oras['meta_value']] = $formular['id'];
					};
						
			}
	}

	
$result = array();
foreach ($items as $key=>$value) {
	if (strpos(strtolower($key), $q) !== false) {
		array_push($result, array("id"=>$value, "label"=>$key, "value" => strip_tags($key)));
	}
	if (count($result) > 11)
		break;
}

// json_encode is available in PHP 5.2 and above, or you can install a PECL module in earlier versions
echo json_encode($result);

}?>