export default class StringUtil {
    static capitalizeFirstLetter = (text) => {

        if (!text)
            return text;

        const textCapitalized = text.charAt(0).toUpperCase() + text.slice(1);
        return textCapitalized;
    }
};
