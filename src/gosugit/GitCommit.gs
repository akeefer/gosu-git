package gosugit
uses java.util.ArrayList

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
    print("Raw data is")
    print(rawData)
    var lines = rawData.split("\n")
    
    if (lines[0].startsWith("commit")) {
      _commitID = lines[0].substring("commit".length + 1).trim()  
    } else {
      // TODO - error  
    }
    
    if (lines[1].startsWith("tree")) {
      _tree = lines[1].substring("tree".length + 1).trim()  
    } else {
      // TODO - error  
    }
    
    var nextLine = 2
    _parents = new ArrayList<String>()
    while (lines[nextLine].startsWith("parent")) {
      _parents.add(lines[nextLine].substring("parent".length + 1).trim()) 
      nextLine++
    }
    
    if (lines[nextLine].startsWith("author")) {
      _author = new Author(lines[nextLine].substring("author".length + 1).trim())
      nextLine++   
    } else {
      // TODO - AHK  
    }
    
    if (lines[nextLine].startsWith("committer")) {
      _committer = new Author(lines[nextLine].substring("committer".length + 1).trim())
      nextLine++   
    } else {
      // TODO - AHK  
    }
    
    // TODO - AHK - Commit message (which is indented)
    
    // TODO - AHK - File names
  }

  property get Author() : Author {
    return _author
  }

  property get Committer() : Author {
    return _author
  }

  property get CommitID() : String {
    return _commitID
  }

  property get Parents() : List<String> {
    return _parents
  }

  property get Tree() : String {
    return _tree
  }

  property get ChangedFiles() : List<String> {
    return _changedFiles
  }

}