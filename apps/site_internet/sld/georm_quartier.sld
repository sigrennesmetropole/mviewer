<?xml version="1.0" encoding="UTF-8"?>
<!--
  
  nom du SLD : [même nom que le style et le présent fichier SLD, cf les règles de nommage]
  
  couche source dans la base :  [schema].[couche]
  layer cible du style       :  ladm_terri:quartier
  
  objet :
  [objectifs du style, description et commentaires, etc]
  
  Historique des versions :
  date        |  auteur              |  description
  18/12/2019  |  Catherine MORALES          |  version initiale
  
-->
<StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" 
xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <sld:NamedLayer>
    <sld:Name>ladm_terri:quartier</sld:Name>
    <sld:UserStyle>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:Name>Saint Martin</sld:Name>
          <sld:Title>Saint Martin</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Saint Martin</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#A6CEE3</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
        <sld:Rule>
          <sld:Name>Bourg l'Evesque - La Touche - Moulin du Comte</sld:Name>
          <sld:Title>Bourg l'Evesque - La Touche - Moulin du Comte</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Bourg l'Evesque - La Touche - Moulin du Comte</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#1F78B4</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
        <sld:Rule>
          <sld:Name>Francisco Ferrer - Landry - Poterie</sld:Name>
          <sld:Title>Francisco Ferrer - Landry - Poterie</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Francisco Ferrer - Landry - Poterie</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#B2DF8A</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
        <sld:Rule>
          <sld:Name>Jeanne d'Arc - Longs Champs - Beaulieu</sld:Name>
          <sld:Title>Jeanne d'Arc - Longs Champs - Beaulieu</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Jeanne d'Arc - Longs Champs - Beaulieu</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#33A02C</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
        <sld:Rule>
          <sld:Name>Le Blosne</sld:Name>
          <sld:Title>Le Blosne</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Le Blosne</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#FB9A99</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
        <sld:Rule>
          <sld:Name>Sud gare</sld:Name>
          <sld:Title>Sud gare</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Sud gare</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#E31A1C</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
		
        <sld:Rule>
          <sld:Name>Bréquigny</sld:Name>
          <sld:Title>Bréquigny</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Bréquigny</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#FDBF6F</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
        <sld:Rule>
          <sld:Name>Villejean - Beauregard</sld:Name>
          <sld:Title>Villejean - Beauregard</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Villejean - Beauregard</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#FF7F00</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
        <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
        <sld:Rule>
          <sld:Name>Centre</sld:Name>
          <sld:Title>Centre</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Centre</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#CAB2D6</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
         </sld:PolygonSymbolizer>
		<sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
		</sld:Rule>
		
		
        <sld:Rule>
          <sld:Name>Cleunay - Arsenal - Redon</sld:Name>
          <sld:Title>Cleunay - Arsenal - Redon</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Cleunay - Arsenal - Redon</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#6A3D9A</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
		  <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
        </sld:Rule>
		
        <sld:Rule>
          <sld:Name>Maurepas - Bellangerais</sld:Name>
          <sld:Title>Maurepas - Bellangerais</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Maurepas - Bellangerais</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#FFFF99</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
		  <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
        </sld:Rule>
		
        <sld:Rule>
          <sld:Name>Thabor - Saint-Hélier - Alphonse Guérin</sld:Name>
          <sld:Title>Thabor - Saint-Hélier - Alphonse Guérin</sld:Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>nom</ogc:PropertyName>
              <ogc:Literal>Thabor - Saint-Hélier - Alphonse Guérin</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#CAF45D</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
            </sld:Fill>
          </sld:PolygonSymbolizer>
          <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>nom</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Verdana</sld:CssParameter>
              <sld:CssParameter name="font-size">10</sld:CssParameter>
            </sld:Font>
            <sld:Halo>
              <sld:Fill>
                <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
          </sld:TextSymbolizer>
        </sld:Rule>
      
	  </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</StyledLayerDescriptor>
