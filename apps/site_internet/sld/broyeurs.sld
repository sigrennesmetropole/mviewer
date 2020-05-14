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
    <se:Name>espub_dech:v_broyage</se:Name>
    <UserStyle>
      <se:Name>Broyeurs</se:Name>
        <se:Description>
          <se:Title>Broyeurs (picto bleu)</se:Title>
          <se:Abstract>Style simple : goutte d'eau bleu</se:Abstract>
        </se:Description>
      <se:FeatureTypeStyle>
      
        <!-- picto de taille unique -->
        <se:Rule>
          <se:Name>Broyeurs</se:Name>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_rouge.png" />
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
