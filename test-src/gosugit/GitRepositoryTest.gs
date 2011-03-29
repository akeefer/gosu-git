package gosugit

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test

uses java.util.Date
uses java.util.List

class GitRepositoryTest {

  // Note:  These tests rely on the gosu-git-test repository.  The commit ids here refer to the
  // various commits there.  Cloning that repository and then using git log/git show should let you verify
  // that the tests are actually asserting the correct things.

  @Test
  function testShowOfSimpleCommit() {
    var commit = GitTestConstants.TestRepository.readCommit("7bf03f114eeb2da71447158bea6038fe2aa513bf")
    assertCommitMatches(commit,
                        "7bf03f114eeb2da71447158bea6038fe2aa513bf",
                        "cd3b0b4ed04ce0f19898ba93242487557c3aeaa3",
                        {"43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d"},
                        null,
                        "Add in FooBar.gs",
                        {"src/test/FooBar.gs"})
  }

  @Test
  function testShowOfInitialCommitWithNoParent() {
    var commit = GitTestConstants.TestRepository.readCommit("43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d")
    assertCommitMatches(commit,
                        "43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d",
                        "369b48703c5afc282f713b30919c3935f6dd163e",
                        {},
                        null,
                        "Initial commit",
                        {"README"})
  }

  @Test
  function testShowOfMergeCommitWithMultipleParents() {
    var commit = GitTestConstants.TestRepository.readCommit("6236803f36364d2d2cb84d28d662a2dea15a190b")
    assertCommitMatches(commit,
                        "6236803f36364d2d2cb84d28d662a2dea15a190b",
                        "f9347bbf13a6d9908c61470a2c5d9a0f1050aa0a",
                        {"d6ac3321270cf8545c1dd632db739be8d997483e", "7ca922b08c1f4cf3e6aefd63fb5364fc55a1537d"},
                        null,
                        "Merge branch 'test-branch'",
                        {})
  }

  @Test
  function testShowOfCommitWithMultipleFilesChanged() {
    var commit = GitTestConstants.TestRepository.readCommit("7d72e903b64e0b7781259bcc93e330462908ca43")
    assertCommitMatches(commit,
                        "7d72e903b64e0b7781259bcc93e330462908ca43",
                        "7d26ef485b56921175130bf22c023d9bed8ed7ca",
                        {"be8b2b23900c9386b8d8b148f44fdc9c7883fe80"},
                        null,
                        "Change both files",
                        {"src/test/FooBar.gs", "src/test/WillBeRemoved.gs"})
  }

  @Test
  function testShowOfCommitWithMultiLineCommitMessage() {
    // TODO - AHK
  }

  @Test
  function testLogOfSingleCommit() {
    var commits = GitTestConstants.TestRepository.log("43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d", "7bf03f114eeb2da71447158bea6038fe2aa513bf")
    assertEquals(1, commits.Count)
    assertCommitMatches(commits[0],
                        "7bf03f114eeb2da71447158bea6038fe2aa513bf",
                        "cd3b0b4ed04ce0f19898ba93242487557c3aeaa3",
                        {"43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d"},
                        null,
                        "Add in FooBar.gs",
                        {"src/test/FooBar.gs"})
  }

  @Test
  function testLogOfMultipleCommits() {
    var commits = GitTestConstants.TestRepository.log("43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d", "be8b2b23900c9386b8d8b148f44fdc9c7883fe80")
    assertEquals(2, commits.Count)

    assertCommitMatches(commits[0],
                        "be8b2b23900c9386b8d8b148f44fdc9c7883fe80",
                        "06bc415550bd84a7eee7249371de538647434968",
                        {"7bf03f114eeb2da71447158bea6038fe2aa513bf"},
                        null,
                        "Yet another commit;",
                        {"src/test/WillBeRemoved.gs"})

    assertCommitMatches(commits[1],
                        "7bf03f114eeb2da71447158bea6038fe2aa513bf",
                        "cd3b0b4ed04ce0f19898ba93242487557c3aeaa3",
                        {"43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d"},
                        null,
                        "Add in FooBar.gs",
                        {"src/test/FooBar.gs"})
  }

  @Test
  function testLogOfBranchCommit() {
    var commits = GitTestConstants.TestRepository.log("7d72e903b64e0b7781259bcc93e330462908ca43", "6236803f36364d2d2cb84d28d662a2dea15a190b")
    assertEquals(4, commits.Count)

    assertCommitMatches(commits[0],
                        "6236803f36364d2d2cb84d28d662a2dea15a190b",
                        "f9347bbf13a6d9908c61470a2c5d9a0f1050aa0a",
                        {"d6ac3321270cf8545c1dd632db739be8d997483e", "7ca922b08c1f4cf3e6aefd63fb5364fc55a1537d"},
                        null,
                        "Merge branch 'test-branch'",
                        {})

    assertCommitMatches(commits[1],
                        "d6ac3321270cf8545c1dd632db739be8d997483e",
                        "fcbfa6bb0156678783b830c5070ecffaab51995d",
                        {"dead5901f68c518050d51d1fd77b11eae3ef1345"},
                        null,
                        "Add in Baz.gs",
                        {"src/test/Baz.gs"})

    assertCommitMatches(commits[2],
                        "7ca922b08c1f4cf3e6aefd63fb5364fc55a1537d",
                        "71a56398daa8db2ddb212423bb8997a4a6f064e3",
                        {"dead5901f68c518050d51d1fd77b11eae3ef1345"},
                        null,
                        "Change FooBar.gs",
                        {"src/test/FooBar.gs"})

    assertCommitMatches(commits[3],
                        "dead5901f68c518050d51d1fd77b11eae3ef1345",
                        "7f7daa621d9337e8303e306c766b222c760c314e",
                        {"7d72e903b64e0b7781259bcc93e330462908ca43"},
                        null,
                        "Delete WillBeRemoved.gs",
                        {"src/test/WillBeRemoved.gs"})
  }

  @Test
  function testLogWithNullSinceArgument() {
    var commits = GitTestConstants.TestRepository.log(null, "be8b2b23900c9386b8d8b148f44fdc9c7883fe80")
    assertEquals(3, commits.Count)

    assertCommitMatches(commits[0],
                        "be8b2b23900c9386b8d8b148f44fdc9c7883fe80",
                        "06bc415550bd84a7eee7249371de538647434968",
                        {"7bf03f114eeb2da71447158bea6038fe2aa513bf"},
                        null,
                        "Yet another commit;",
                        {"src/test/WillBeRemoved.gs"})

    assertCommitMatches(commits[1],
                        "7bf03f114eeb2da71447158bea6038fe2aa513bf",
                        "cd3b0b4ed04ce0f19898ba93242487557c3aeaa3",
                        {"43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d"},
                        null,
                        "Add in FooBar.gs",
                        {"src/test/FooBar.gs"})

    assertCommitMatches(commits[2],
                        "43b0f87ebeadd0babe5b3fe8362e986b6ddceb5d",
                        "369b48703c5afc282f713b30919c3935f6dd163e",
                        {},
                        null,
                        "Initial commit",
                        {"README"})

    // TODO - AHK
  }

  // ==========================================================================
  //                            Helper Methods
  // ==========================================================================

  private function assertCommitMatches(commit : GitCommit,
                                       commitID : String,
                                       tree : String,
                                       parents : List<String>,
                                       date : Date,
                                       message : String,
                                       changedFiles : List<String>) {
    assertEquals(commitID, commit.CommitID)
    assertEquals(tree, commit.Tree)
    assertEquals(parents.Count, commit.Parents.Count)
    for (i in 0..|parents.Count) {
      assertEquals(parents[i], commit.Parents[i])
    }
    assertEquals("Alan Keefer", commit.Author.Name)
    assertEquals("akeefer@guidewire.com", commit.Author.EmailAddress)
    // TODO - Date
    assertEquals("Alan Keefer", commit.Committer.Name)
    assertEquals("akeefer@guidewire.com", commit.Committer.EmailAddress)
    // TODO - Date
    assertEquals(message, commit.Message)
    assertEquals(changedFiles.Count, commit.ChangedFiles.Count)
    for (i in 0..|changedFiles.Count) {
      assertEquals(changedFiles[i], commit.ChangedFiles[i])
    }
  }

  private function assertEquals(s1 : String, s2 : String) {
    Assert.assertEquals(s1, s2)
  }

  private function assertEquals(i1 : int, i2 : int) {
    Assert.assertEquals(i1, i2)
  }
}