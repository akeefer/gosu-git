package gosugit

uses java.lang.IllegalStateException
uses java.io.File

class GitRepository {

  var _baseDir : File
  var _git : Git

  construct(__git : Git, __baseDir : File) {
    _git = __git
    _baseDir = __baseDir
  }

  function readObject(sha1 : String) : GitObject {
    // TODO - AHK - Need to figure out the type of the object
    return null  
  }
  
  function readCommit(sha1 : String) : GitCommit {
    var call = "git show --pretty=\"raw\" --name-only " + sha1
    var result = _git.executeCall(_baseDir, call)  
    return new GitCommit(this, result)
  }

}