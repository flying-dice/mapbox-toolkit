import { AnyLayer, GeoJSONSourceOptions, Map } from "mapbox-gl";
import { v4 } from "uuid";

export class GeoJsonLayer {
  private readonly id: string;

  private map: Map;

  constructor(
    private readonly source: GeoJSONSourceOptions,
    private readonly layer: Omit<AnyLayer, "id">
  ) {
    this.id = v4();
  }

  addTo(map: Map): this {
    this.map = map;
    this.map.addSource(this.id, {
      type: "geojson",
      ...this.source,
    });
    this.map.addLayer({ id: this.id, ...this.layer } as AnyLayer);
    return this;
  }

  remove() {
    this.map.removeLayer(this.id);
    this.map.removeSource(this.id);
  }
}
