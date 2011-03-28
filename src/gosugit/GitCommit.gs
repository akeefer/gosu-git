package gosugit

uses java.util.ArrayList
uses java.util.List
uses java.lang.StringBuilder
uses java.lang.IllegalArgumentException

/**
 * The GitCommit class represents a single commit object within a git repository.  The commit
 * contains information about the author, committer, the associated repository tree, the parents
 * of the commit, the commit message, and the list of files changed by the commit
 */
class GitCommit extends GitObject {

  private var _repository : GitRepository

  private var _author : Author
  private var _committer : Author
  private var _commitID : String
  private var _parents : List<String>
  private var _tree : String
  private var _message : String
  private var _changedFiles : List<String>

  private construct(__repository : GitRepository,
                    __commitID : String,
                    __tree : String,
                    __parents : List<String>,
                    __author : Author,
                    __committer : Author,
                    __message : String,
                    __changedFiles : List<String>) {
    _repository = __repository
    _commitID = __commitID
    _tree = __tree
    _parents = __parents
    _author = __author
    _committer = __committer
    _message = __message
    _changedFiles = __changedFiles
  }

  /**
   * Constructs a set of GitCommit objects based on raw output from git log or git show.
   * The data is assumed to be produced by "git show --pretty="raw" --names-only <sha1>"
   * The resulting output of git in that case is roughly:
   *
   * commit <sha1>
   * tree <sha1>
   * parent <sha1>
   * author <Name> <email> <unix timestamp>
   * committer <Name> <email> <unix timestamp>
   * 
   *     Message
   *     Message
   * 
   * Changed File
   * Changed File
   *
   * That pattern will be repeated, with a blank line in between the end of one commit and
   * the start of the next one, for each commit if multiple commits have been described.
   */
  static function readCommitList(repository : GitRepository, rawData : String) : List<GitCommit> {
    var lines = rawData.split("\n")
    var commits = new ArrayList<GitCommit>()
    var nextLine = 0
    while (nextLine < lines.length) {
      var result = readCommitFromOutput(repo, lines, nextLine)
      commits.add(result._commit)
      nextLine = result._nextLine
    }
    return commits
  }

  private static class SimplePair {
    var _commit : GitCommit
    var _nextLine : int

    construct(commit : GitCommit, nextLine : int) {
      _commit = commit
      _nextLine = nextLine
    }
  }

  static function readCommitFromOutput(repository : GitRepository, lines : String[], nextLine : int) : SimplePair {
    var commitID : String
    if (lines[nextLine].startsWith("commit")) {
      commitID = lines[nextLine].substring("commit".length + 1).trim()
      nextLine++
    } else {
      throw new IllegalArgumentException("The first line of the raw data should start with \"commit\".  Full input was:\n" + rawData)
    }

    var tree : String
    if (lines[nextLine].startsWith("tree")) {
      tree = lines[nextLine].substring("tree".length + 1).trim()
      nextLine++
    } else {
      throw new IllegalArgumentException("The second line of the raw data should start with \"tree\".  Full input was:\n" + rawData)
    }

    var parents : List<String = {}
    while (lines[nextLine].startsWith("parent")) {
      parents.add(lines[nextLine].substring("parent".length + 1).trim())
      nextLine++
    }

    var author : Author
    if (lines[nextLine].startsWith("author")) {
      author = new Author(lines[nextLine].substring("author".length + 1).trim())
      nextLine++
    } else {
      throw new IllegalArgumentException("The first line of the raw data after the parents should start with \"author\".  Full input was:\n" + rawData)
    }

    var committer : Author
    if (lines[nextLine].startsWith("committer")) {
      committer = new Author(lines[nextLine].substring("committer".length + 1).trim())
      nextLine++
    } else {
      throw new IllegalArgumentException("The line of the raw data after the author should start with \"committer\".  Full input was:\n" + rawData)
    }

    // Each line of the commit message is prepended with four spaces
    var messageBuilder = new StringBuilder()
    while(nextLine < lines.length) {
      if (!lines[nextLine].Empty) {
        if (lines[nextLine].startsWith("    ")) {
          // Part of the commit message
          if (messageBuilder.length() > 0) {
            messageBuilder.append("\n")
          }
          messageBuilder.append(lines[nextLine].substring(4))
        } else {
          // Start of the affected files list
          break
        }
      }
      nextLine++
    }
    var message = messageBuilder.toString()

    var changedFiles : List<String> = {}
    while(nextLine < lines.length) {
      if (lines[nextLine].NotBlank) {
        _changedFiles.add(lines[nextLine])
        nextLine++
      } else {
        nextLine++
        break
      }
    }

    return new SimplePair(new GitCommit(repository, commitID, tree, parents, author, committer, message, changedFiles), nextLine)
  }

  /**
   * The author of the commit.
   */
  property get Author() : Author {
    return _author
  }

  /**
   * The committer.  Normally this is the same as the Author, but it can differ
   * in the case of a patch that was created by one person but applied and committed
   * by another.
   */
  property get Committer() : Author {
    return _author
  }

  /**
   * The sha1 hash of the commit.
   */
  property get CommitID() : String {
    return _commitID
  }

  /**
   * The sha1 hashes of the parents.  Note that this list can be empty.  "Normal" commits
   * will generally have a single parent, while intial root commits will have no parents
   * and merge commits will have two or more parents.
   */
  property get Parents() : List<String> {
    return _parents
  }

  /**
   * The sha1 has of the tree associated with this commit.
   */
  property get Tree() : String {
    return _tree
  }

  /**
   * The message associated with this commit.
   */
  property get Message() : String {
    return _message  
  }

  /**
   * A list of affected files, expressed as relative paths from the root of the repository.
   */
  property get ChangedFiles() : List<String> {
    return _changedFiles
  }
  
  override function toString() : String {
    var sb = new StringBuilder()
    sb.append("commit: ").append(_commitID).append("\n")
    sb.append("tree: " ).append(_tree).append("\n")
    for(p in _parents) {
      sb.append("parent: ").append(p).append("\n")  
    }
    sb.append("author: ").append(_author.toString()).append("\n")
    sb.append("committer: ").append(_committer.toString()).append("\n")
    sb.append("\n")
    sb.append("Message:\n")
    sb.append(_message).append("\n")
    sb.append("\n")
    sb.append("Changed Files:\n")
    for (f in _changedFiles) {
      sb.append(f).append("\n")  
    }
    return sb.toString()
  }

}