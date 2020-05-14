<?xml version="1.0" encoding="UTF-8"?>
<!--
  
  nom du SLD : broyeurs.sld
  
  couche source dans la base :  espace_public.v_broyage
  layer cible du style       :  espub_dech:v_broyage
  
  objet : goutte bleu pour les cartes de la DG Comm mais taille unique car peu d'objets à afficher en même temps
  
  Historique des versions :
  date        |  auteur              |  description
  05/06/2019  |  Cédric Briand         |  version initiale
  
-->
<StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" 
xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <se:Name>sec_sanit:v_sondage_amiante</se:Name>
    <UserStyle>
      <se:Name>Sondage amiante</se:Name>
        <se:Description>
          <se:Title>Sondage amiante</se:Title>
          <se:Abstract>Style simple : goutte d'eau bleu</se:Abstract>
        </se:Description>
      <se:FeatureTypeStyle>
      
        <!-- picto de taille unique -->
         <se:Rule>
          <se:Name>Négatif</se:Name>
          <ogc:Filter>
            <ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>resultat</ogc:PropertyName>
                <ogc:Literal>Négatif</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_vert_smap.png" />
                <se:Format>image/png</se:Format>
              </se:ExternalGraphic>
              <se:Size>30</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>

        <se:Rule>
          <se:Name>Positif ou Douteux</se:Name>
          <ogc:Filter>
            <ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>resultat</ogc:PropertyName>
                <ogc:Literal>Positif</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_rouge_smap.png" />
                <se:Format>image/png</se:Format>
              </se:ExternalGraphic>
              <se:Size>30</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
         </se:Rule>

      </se:FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
