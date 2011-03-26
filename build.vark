uses gw.vark.annotations.*

var srcDir = file("src")
var distDir = file("dist")

@Target
function jar() {
  Ant.mkdir(:dir = distDir)
  Ant.jar(:destfile = distDir.file("myproject.jar"),
          :basedir = srcDir)
}

@Target
function clean() {
  Ant.delete(:dir = distDir)
}