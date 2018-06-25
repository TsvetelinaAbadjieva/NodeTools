switchToLang (item, toLang) {

    var itemStr = item.toString('utf8');

    switch (toLang) {

    case 'BG': {

        if (itemStr.indexOf('st') != -1) {
            itemStr = itemStr.replace('st', '-ви');
        }

        else if (itemStr.indexOf('7th') != -1 || itemStr.indexOf('8th') != -1) {
            itemStr = itemStr.replace('th', '-ми');
        }

        else if (itemStr.indexOf('th') != -1 || itemStr.indexOf('rd') != -1) {
            itemStr = itemStr.replace('th', '-ти');
            itemStr = itemStr.replace('rd', '-ти');
        }

        else if (itemStr.indexOf('nd') != -1) {
            itemStr = itemStr.replace('nd', '-ри');
        }

    } break;

    case 'EN': {
        if (itemStr.indexOf('-ви') != -1) {
            itemStr = itemStr.replace('-ви', 'st');
        }

        else if (itemStr.indexOf('-ти') != -1) {
            itemStr = itemStr.replace('-ти', 'th');
        }

        else if (itemStr.indexOf('-ми') != -1) {
            itemStr = itemStr.replace('-ми', 'th');
        }

        else if (itemStr.indexOf('-ри') != -1) {
            itemStr = itemStr.replace('-ри', 'nd');
        }

    } break;
    }

    return itemStr;
}

