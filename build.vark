var srcDir = file("src")
var distDir = file("dist")

function jar() {
  Ant.mkdir(:dir = distDir)
  Ant.jar(:destfile = distDir.file("myproject.jar"),
          :basedir = srcDir)
}

function clean() {
  Ant.delete(:dir = distDir)
}