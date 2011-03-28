package gosugit;

import gw.lang.reflect.IHasJavaClass;
import gw.lang.reflect.TypeSystem;
import gw.lang.shell.Gosu;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.model.InitializationError;

import java.util.ArrayList;

@RunWith(GosuGitSuite.class)
public class GosuGitSuite extends Suite {

  public GosuGitSuite(Class clazz) throws InitializationError {
    super(init(clazz), getAllTestClasses());
  }

  private static Class init(Class clazz) {
    Gosu.init();
    return clazz;
  }

  public static Class[] getAllTestClasses() {
    return classesFor(
      "gosugit.GitRepositoryTest"
    );
  }

  private static Class[] classesFor(String... types) {
    ArrayList<Class> classes = new ArrayList<Class>();
    for (String typeName : types) {
      IHasJavaClass type = (IHasJavaClass) TypeSystem.getByFullName(typeName);
      classes.add(type.getBackingClass());
    }
    return classes.toArray(new Class[classes.size()]);
  }
}
