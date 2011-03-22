package gosugit
uses java.lang.IllegalStateException
uses java.io.File
uses gw.util.Shell

class Git {

  private var _executablePath : String

  construct(executablePath : String) {
    _executablePath = executablePath  
  }  

  public function executeCall(baseDir : File, commandLine : String) : String {
    var actualCommand : String
    if (commandLine.startsWith("git")) {
      actualCommand = _executablePath + commandLine.substring(3)  
    } else {
      actualCommand = _executablePath + " " + commandLine  
    }
    
    var process = Shell.buildProcess( actualCommand )
    process.setDirectory( baseDir )
    return process.exec()
  }

}