import { AnyLayer, GeoJSONSourceOptions, Map } from "mapbox-gl";
import { v4 } from "uuid";

export class GeoJsonLayer {
  private readonly id: string;

  private map: Map;

  constructor(
    private readonly source: GeoJSONSourceOptions,
    private readonly layers: Omit<AnyLayer, "id" | "source">[]
  ) {
    this.id = v4();
  }

  addTo(map: Map): this {
    this.map = map;
    this.map.addSource(this.id, {
      type: "geojson",
      ...this.source,
    });
    for (const [index, layer] of this.layers.entries()) {
      this.map.addLayer({
        id: `${this.id}_${index}`,
        source: this.id,
        ...layer,
      } as AnyLayer);
    }

    return this;
  }

  remove() {
    for (const [index, layer] of this.layers.entries()) {
      this.map.removeLayer(`${this.id}_${index}`);
    }
    this.map.removeSource(this.id);
  }
}
