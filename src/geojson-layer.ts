import { AnyLayer, GeoJSONSourceOptions, Map } from "mapbox-gl";
import { v4 } from "uuid";

export class GeoJsonLayer {
  /**
   * Main reference ID, used for the source when registering with Mapbox
   */
  readonly id: string;

  /**
   * Layer reference IDs for each layer passed in
   */
  readonly layerIds: string[];

  private map: Map;

  constructor(
    private readonly source: GeoJSONSourceOptions,
    private readonly layers: Omit<AnyLayer, "id" | "source">[]
  ) {
    this.id = v4();
    this.layerIds = this.layers.map((_, index) => `${this.id}_${index}`);
  }

  addTo(map: Map): this {
    this.map = map;
    this.map.addSource(this.id, {
      type: "geojson",
      ...this.source,
    });
    for (const [index, layer] of this.layers.entries()) {
      this.map.addLayer({
        id: this.layerIds[index],
        source: this.id,
        ...layer,
      } as AnyLayer);
    }

    return this;
  }

  remove() {
    for (const [index, layer] of this.layers.entries()) {
      this.map.removeLayer(this.layerIds[index]);
    }
    this.map.removeSource(this.id);
  }
}
