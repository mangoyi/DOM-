function getHTTPObject() {
    if (typeof XMLHttpRequest === 'undefined') {
        XMLHTTPRequest = function() {
            var versions = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP"];
            try {
                return new ActiveXObject(versions[i]);
            } catch (e) {
                throw new Error('Error');  
            }
        }
    }
    return new XMLHttpRequest();
}