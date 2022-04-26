import Draw, {
  DrawCustomMode,
  DrawMode,
  MapboxDrawControls,
} from "@mapbox/mapbox-gl-draw";
import { dissolve, unkinkPolygon } from "@turf/turf";

export class MapboxDraw extends Draw {
  constructor(options: {
    displayControlsDefault?: boolean | undefined;
    keybindings?: boolean | undefined;
    touchEnabled?: boolean | undefined;
    boxSelect?: boolean | undefined;
    clickBuffer?: number | undefined;
    touchBuffer?: number | undefined;
    controls?: MapboxDrawControls | undefined;
    styles?: object[] | undefined;
    modes?: { [modeKey: string]: DrawMode | DrawCustomMode } | undefined;
    defaultMode?: string | undefined;
    userProperties?: boolean | undefined;
  }) {
    super(options);
  }

  dissolveSelected() {
    const selectedIds = this.getSelectedIds();
    const selectedFeatures = this.getSelected();
    let dissolveIterations = 0;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let dissolved = dissolve(unkinkPolygon(selectedFeatures));

    while (dissolved.features.length > 1 && dissolveIterations < 3) {
      dissolved = dissolve(dissolved);
      dissolveIterations++;
    }
    this.add(dissolved);
    this.delete(selectedIds);
  }

  deleteSelected() {
    this.delete(this.getSelectedIds());
  }

  drawLineMode() {
    this.changeMode("draw_line_string");
  }

  drawPointMode() {
    this.changeMode("draw_point");
  }

  drawPolygonMode() {
    this.changeMode("draw_polygon");
  }
}
