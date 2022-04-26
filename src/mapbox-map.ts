import {
  AnyLayer,
  GeoJSONSourceOptions,
  LngLatLike,
  Map,
  MapboxOptions,
  Marker,
  MarkerOptions,
  Style,
} from "mapbox-gl";
import { getDebugger } from "./debug";
import { GeoJsonLayer } from "./geojson-layer";

const debug = getDebugger("MapboxMap");

export class MapboxMap extends Map {
  constructor(options: MapboxOptions) {
    super(options);
  }

  async setStyleAsync(style: Style | string): Promise<this> {
    debug(`Setting new Style ${style}`);
    return new Promise((resolve) => {
      super.setStyle(style);
      super.on("style.load", () => {
        debug("Successfully set style");
        resolve(this);
      });
    });
  }

  addMarker(options: MarkerOptions, lngLat?: LngLatLike): Marker {
    const marker = new Marker();
    if (lngLat) {
      marker.setLngLat(lngLat);
    }

    marker.addTo(this);
    return marker;
  }

  addGeoJsonLayer(
    source: GeoJSONSourceOptions,
    layer: Omit<AnyLayer, "id">
  ): GeoJsonLayer {
    const geoJsonLayer = new GeoJsonLayer(source, layer);
    geoJsonLayer.addTo(this);
    return geoJsonLayer;
  }
}
