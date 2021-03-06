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
    // TODO - AHK - Throw if sha1 is null
    var call = "git show --pretty=\"raw\" --name-only " + sha1
    var result = _git.executeCall(_baseDir, call)  
    var commits = GitCommit.readCommitList(this, result)
    return commits[0]
  }

  function log(since : String, until : String) : List<GitCommit> {
    // TODO - AHK - Throw if until is null
    var call = "git log --pretty=\"raw\" --name-only "
    if (since == null) {
      call = call + until
    } else {
      call = call + since + ".." + until
    }
    var result = _git.executeCall(_baseDir, call)
    return GitCommit.readCommitList(this, result)
  }

}