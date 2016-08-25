//ST хендлер
declare({
    match: function (barcodeSpec, strBarcode) {
        var regexp = /^(\\0000\d\d)?ST0001[1|2]\|([^|]*[|]){7,15}([^|]*)$/;
        var res = strBarcode.search(regexp);
        var matchRes = {
            match: res > -1
        };
        return matchRes;
    },
    parse: function (barcodeSpec, strBarcode) {
        var reqMap = defaultParsers.stParse(barcodeSpec, strBarcode);
        var requisites = {};
        var keySet = reqMap.keySet();
        //@formatter:off
        for each(var key in keySet){
            requisites[key] = reqMap.get(key);
        }
        //@formatter:on
        return requisites;
    },
    map: function (fields, requisites) {
        var attrAndAmount = defaultMappers.map(fields, requisites);
        return attrAndAmount
    }
});