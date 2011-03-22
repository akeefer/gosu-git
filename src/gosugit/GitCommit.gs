package gosugit

class GitCommit extends GitObject {

  private var _repository : GitRepository

  private var _author : Author
  private var _committer : Author
  private var _commitID : String
  private var _parents : List<String>
  private var _tree : String
  private var _changedFiles : List<String>

  construct(repository : GitRepository, rawData : String) {
    _repository = repository
  }

  property get Author() : Author {
    return _author
  }

  property get Committer : Author {
    return _author
  }

  property get CommitID() : String {
    return _commitID
  }

  property get Parents() : List<String> {
    return _parents
  }

  property get Tree() : String {
    return _truee
  }

  property get ChangedFiles : List<String> {
    return _changedFiles
  }

}