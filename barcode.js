var barcode = (function(){
    function createElement(tag, className) {
        var ele = document.createElement(tag);
        ele.className = className;
        return ele;
    }
    
    function stringToArray(value) {
        var a = value.split("");
        for(var i = 0; i < a.length; i++) {
            a[i] = a[i] - 0; //to number
        }
        return a;
    }
    
    function setCheckDigitUPCA(a) {
        var check = (3 * (a[0] + a[2] + a[4] + a[6] + a[8] + a[10]) + a[1] + a[3] + a[5] + a[7] + a[9]) % 10;
        if(check != 0) {
            check = 10 - check;
        }
        a[11] = check;
    }

    return {
        createUPCA: function (value) {
            var values = stringToArray(value);
            setCheckDigitUPCA(values);
            
            var barcode = createElement("span", "barcode upc-a");
            
            barcode.appendChild(createElement("i", "bcs"));
            
            var l = createElement("span", "bcl");
            for(var i = 0; i < 6; i++) {
                l.appendChild(createElement("b", "bc" + values[i]));
            }
            barcode.appendChild(l);
            
            barcode.appendChild(createElement("i", "bcm"));
            
            var r = createElement("span", "bcr");
            for(; i < 12; i++) {
                r.appendChild(createElement("b", "bc" + values[i]));
            }
            barcode.appendChild(r);
            
            barcode.appendChild(createElement("i", "bce"));
            
            return barcode;
        }
    };
})();


