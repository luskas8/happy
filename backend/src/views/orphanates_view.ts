import Orphanate from "../models/Orphanate";
import imagesView from "./images_view";

export default {
    render(orphanate: Orphanate) {
        return {
            id: orphanate.id,
            name: orphanate.name,
            latitude: orphanate.latitude,
            longitude: orphanate.longitude,
            about: orphanate.about,
            intructions: orphanate.instructions,
            opening_hours: orphanate.opening_hours,
            open_on_weekend: orphanate.open_on_weekend,
            images: imagesView.renderMany(orphanate.images),
        };
    },
    
    renderMany(orphanates: Orphanate[]) {
        return orphanates.map(orphanate => this.render(orphanate));
    }
}