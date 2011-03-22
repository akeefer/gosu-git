package gosugit
uses java.util.Date
uses java.lang.Integer
uses java.lang.Long

class Author {

  var _name : String
  var _emailAddress : String
  var _date : Date
  
  construct(rawData : String) {
    var emailStart = rawData.indexOf( "<" )
    var emailEnd = rawData.indexOf(">")
    _name = rawData.substring(0, emailStart).trim()
    _emailAddress = rawData.substring(emailStart + 1, emailEnd).trim()
    // TODO - AHK - Need to handle the time zone
    var dateString = rawData.substring(emailEnd + 1).trim()
    var zoneStart = dateString.indexOf(" ")
    var timestamp = dateString.substring(0, zoneStart).trim()
    var timezone = dateString.substring(zoneStart + 1).trim()
    // TODO - AHK - Figure out the time zone stuff
    _date = new Date(Long.parseLong( timestamp ) * 1000l)
  }

  property get Name() : String {
    return _name
  }

  property get EmailAddress() : String {
    return _emailAddress
  }

  property get Date() : Date {
    return _date
  }

}