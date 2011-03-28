package gosugit

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test

class GitRepositoryTest {

  @Test
  function testShowOfSimpleCommit() {
    var commit = GitTestConstants.TestRepository.readCommit("7bf03f114eeb2da71447158bea6038fe2aa513bf")
    assertEquals("7bf03f114eeb2da71447158bea6038fe2aa513bf", commit.CommitID)
    assertEquals("cd3b0b4ed04ce0f19898ba93242487557c3aeaa3", commit.Tree)
    assertEquals(1, commit.Parents.Count)
    assertEquals("43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d", commit.Parents[0])
    assertEquals("Alan Keefer", commit.Author.Name)
    assertEquals("akeefer@guidewire.com", commit.Author.EmailAddress)
    // TODO - The date
    assertEquals("Alan Keefer", commit.Committer.Name)
    assertEquals("akeefer@guidewire.com", commit.Committer.EmailAddress)
    // TODO - The date
    assertEquals("Add in FooBar.gs", commit.Message)
    assertEquals(1, commit.ChangedFiles.Count)
    assertEquals("src/test/FooBar.gs", commit.ChangedFiles[0])
  }

  @Test
  function testShowOfInitialCommitWithNoParent() {

  }

  @Test
  function testShowOfMergeCommitWithMultipleParents() {

  }

  @Test
  function testShowOfCommitWithMultipleFilesChanged() {

  }

  @Test
  function testShowOfCommitWithMultiLineCommitMessage() {

  }

  @Test
  function testLogOfSingleCommit() {

  }

  @Test
  function testLogOfMultipleCommits() {

  }

  @Test
  function testLogOfBranchCommit() {

  }

  @Test
  function testLogWithNullSinceArgument() {

  }

  @Test
  function testNothing() {

  }

  // ==========================================================================
  //                            Helper Methods
  // ==========================================================================

  function assertEquals(s1 : String, s2 : String) {
    Assert.assertEquals(s1, s2)
  }

  function assertEquals(i1 : int, i2 : int) {
    Assert.assertEquals(i1, i2)
  }
  /*  function readCommit(sha1 : String) : GitCommit {
    // TODO - AHK - Throw if sha1 is null
    var call = "git show --pretty=\"raw\" --name-only " + sha1
    var result = _git.executeCall(_baseDir, call)
    return new GitCommit(this, result)
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
  }*/
}