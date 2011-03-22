package gosugit

class Git {

  // TODO - AHK - I'm not sure if this should be like this or not

  private static var _executablePath

  public static property get ExecutablePath() : String {
    return _executablePath
  }

  public static property set ExecutablePath(path : String) {
    _executablePath = path
  }

  public function show(sha1 : String) : GitObject {

  }

}