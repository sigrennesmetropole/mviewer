<?xml version="1.0" encoding="UTF-8"?>
<!--
  
  nom du SLD : [même nom que le style et le présent fichier SLD, cf les règles de nommage]
  
  couche source dans la base :  [schema].[couche]
  layer cible du style       :  eq_poi:v_sitorg_organisme
  
  objet :
  [objectifs du style, description et commentaires, etc]
  
  Historique des versions :
  date        |  auteur              |  description
  10/07/2018  |  Prénom NOM          |  version initiale
  
-->
<StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" 
xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <se:Name>test_postgistest:v_sitorg_organisme</se:Name>
    <UserStyle>
      <se:Name>[même nom que le fichier cf ligne 4]</se:Name>
        <se:Description>
          <se:Title>Titre court descriptif</se:Title>
          <se:Abstract>Explications plus détaillées sur le style</se:Abstract>
        </se:Description>
      <se:FeatureTypeStyle>
      
        <se:Rule>
          <se:Name>Crèche municipale et intercommunale</se:Name>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>code_nomenclature_principale</ogc:PropertyName>
              <ogc:Literal>2.1.1</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
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

        <se:Rule>
          <se:Name>Crèche associative et d'entreprise</se:Name>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>code_nomenclature_principale</ogc:PropertyName>
              <ogc:Literal>2.1.2</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_bleu.png" />
                <se:Format>image/png</se:Format>
              </se:ExternalGraphic>
              <se:Size>30</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>

		<se:Rule>
          <se:Name>Halte garderie</se:Name>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>code_nomenclature_principale</ogc:PropertyName>
              <ogc:Literal>2.1.3</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_violet.png" />
                <se:Format>image/png</se:Format>
              </se:ExternalGraphic>
              <se:Size>30</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>

		<se:Rule>
          <se:Name>Assistante maternelle</se:Name>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>code_nomenclature_principale</ogc:PropertyName>
              <ogc:Literal>2.1.4</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_vert.png" />
                <se:Format>image/png</se:Format>
              </se:ExternalGraphic>
              <se:Size>30</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>

		<se:Rule>
          <se:Name>Information</se:Name>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>code_nomenclature_principale</ogc:PropertyName>
              <ogc:Literal>2.1.5</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_orange.png" />
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
