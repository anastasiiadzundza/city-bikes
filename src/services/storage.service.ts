import { isEmpty } from "lodash";

export default function storageService() {
    const getWidgetIds = () => {
        const widgetIdsString = localStorage.getItem('widgetData');
        if (!isEmpty(widgetIdsString)) {
            return widgetIdsString.split(',');
        } else {
            return [];
        }
    };

    const setWidget = (id) => {
        let widgetIdsString = localStorage.getItem('widgetData');

        const isNewWidget = widgetIdsString ? !widgetIdsString.split(',').find(widgetId => widgetId === id) : true;

        let widgetData;
        if (widgetIdsString && isNewWidget) {
            widgetData = `${widgetIdsString},${id}`;
        } else if (!widgetIdsString) {
            widgetData = id;
        } else if (widgetIdsString && !isNewWidget) {
            widgetData = widgetIdsString;
        }

        localStorage.setItem('widgetData', widgetData);

    };

    const removeWidget = (id) => {
        const widgetIdsString = localStorage.getItem('widgetData');
        if (!isEmpty(widgetIdsString)) {
            const widgetIds = widgetIdsString.split(',');
            widgetIds.splice(widgetIds.indexOf(id), 1);
            localStorage.setItem('widgetData', widgetIds.join());
        }
    };

    return {
        getWidgetIds,
        setWidget,
        removeWidget
    }
}