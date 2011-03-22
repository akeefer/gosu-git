package gosugit

class GitRepository {

  private _baseDir : File
  private _git : Git

  construct(__git : Git, __baseDir : File) {
    _git = __git
    _baseDir = __baseDir
  }


  function readObject(sha1 : String) : GitObject {
    // TODO - AHK
  }

  function readCommit(sha1 : String) : GitCommit {
    return readObject(sha1) as GitCommit
  }
}