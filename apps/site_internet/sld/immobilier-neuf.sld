<?xml version="1.0" encoding="UTF-8"?>
<!--
  
  nom du SLD : [même nom que le style et le présent fichier SLD, cf les règles de nommage]
  
  couche source dans la base :  [schema].[couche]
  layer cible du style       :  eq_poi:v_sitorg_organisme
  
  objet :
  [objectifs du style, description et commentaires, etc]
  
  Historique des versions :
  date        |  auteur              |  description
  jj/mm/aaaa  |  Prénom NOM          |  version initiale
  
-->
<StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" 
xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <se:Name>log_immo:v_habitat_prg_immo</se:Name>
    <UserStyle>
      <se:Name>[même nom que le fichier cf ligne 4]</se:Name>
        <se:Description>
          <se:Title>Titre court descriptif</se:Title>
          <se:Abstract>Explications plus détaillées sur le style</se:Abstract>
        </se:Description>
      <se:FeatureTypeStyle>
      
        <se:Rule>
          <se:Name>Accession à prix maîtrisé</se:Name>
          <ogc:Filter>
            <ogc:Or>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>type_financement</ogc:PropertyName>
                <ogc:Literal>Accession à prix maîtrisé</ogc:Literal>
              </ogc:PropertyIsEqualTo>
              <ogc:PropertyIsEqualTo >
                <ogc:PropertyName>type_financement</ogc:PropertyName>
                <ogc:Literal>Accession à prix maîtrisé - Maison + Jardin</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:Or>
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
          <se:Name>Accession sociale</se:Name>
          <ogc:Filter>
	    <ogc:Or>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>type_financement</ogc:PropertyName>
                <ogc:Literal>Accession sociale</ogc:Literal>
              </ogc:PropertyIsEqualTo>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>type_financement</ogc:PropertyName>
                <ogc:Literal>Accession sociale - BRS</ogc:Literal>
              </ogc:PropertyIsEqualTo>
	    </ogc:Or>
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
          <se:Name>Dispositif Pinel</se:Name>
          <ogc:Filter>
	    <ogc:PropertyIsLike wildCard="*" singleChar="." escapeChar="!">
              <ogc:PropertyName>type_financement</ogc:PropertyName>
              <ogc:Literal>Dispositif Pinel*</ogc:Literal>
            </ogc:PropertyIsLike>
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
          <se:Name>Investissement PLS</se:Name>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type_financement</ogc:PropertyName>
              <ogc:Literal>Investissement PLS</ogc:Literal>
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
          <se:Name>Financement libre</se:Name>
          <ogc:Filter>
            <ogc:Or>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type_financement</ogc:PropertyName>
              <ogc:Literal>Financement libre</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>type_financement</ogc:PropertyName>
              <ogc:Literal>Accession non aidée</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            </ogc:Or>
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

        <se:Rule>
          <se:Name>Financement divers</se:Name>
          <ogc:Filter>
             <ogc:Or>
                <ogc:PropertyIsLike wildCard="*" singleChar="." escapeChar="!">
                  <ogc:PropertyName>type_financement</ogc:PropertyName>
                  <ogc:Literal>Accession*Financement*</ogc:Literal>
                </ogc:PropertyIsLike>
                <ogc:PropertyIsLike wildCard="*" singleChar="." escapeChar="!">
                  <ogc:PropertyName>type_financement</ogc:PropertyName>
                  <ogc:Literal>*Financement*Pinel*</ogc:Literal>
                </ogc:PropertyIsLike>
                <ogc:PropertyIsLike wildCard="*" singleChar="." escapeChar="!">
                  <ogc:PropertyName>type_financement</ogc:PropertyName>
                  <ogc:Literal>*PLS*Pinel*</ogc:Literal>
                </ogc:PropertyIsLike>
            </ogc:Or>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:MaxScaleDenominator>500000</se:MaxScaleDenominator>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource  xlink:type="simple" xlink:href="https://public.sig.rennesmetropole.fr/ressources/img/mviewer/marker_vert-eau.png" />
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
