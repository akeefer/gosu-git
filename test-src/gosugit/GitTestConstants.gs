package gosugit

uses java.io.File

class GitTestConstants {

  static property get ExecutablePath() : String {
    return "C:\\Program Files (x86)\\Git\\bin\\git.exe"
  }

  static property get Git() : Git {
    return new Git(ExecutablePath)
  }

  static property get TestRepositoryPath() : String {
    return "C:\\projects\\gosu-git-test"
  }

  static property get TestRepository() : GitRepository {
    return new GitRepository(Git, new File(TestRepositoryPath))
  }

}