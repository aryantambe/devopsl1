package src.main.java.com;


import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class App {
  public static String getMessage() { return "Hello from CI/CD 👋"; }

  public static void main(String[] args) throws Exception {
    int port = 8080;
    HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
    server.createContext("/", new RootHandler());
    server.setExecutor(null);
    System.out.println("Server started on port " + port);
    server.start();
  }

  static class RootHandler implements HttpHandler {
    public void handle(HttpExchange exchange) {
      try {
        String response = App.getMessage();
        exchange.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
      } catch(Exception e) {
        e.printStackTrace();
      }
    }
  }
}