## Gallery 3 API JS Client

A Gallery 3 REST API Clien in JavaScript

### References

 http://codex.galleryproject.org/Gallery3:API:REST

### Important Note

If you want to use this library from the browser and you don't have Gallery 3.1 (which enables CORS) you should enable it in Apache.

* Enable HEADERS module
* Add this lines to your VirtualHost configuration:

```
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "POST, GET, OPTIONS"
Header set Access-Control-Allow-Headers "x-gallery-request-key,x-gallery-request-method"
```

Modify your modules/rest/controllers/rest.php to avoid auth if OPTIONS method is required:

```
...

      $request->url = url::abs_current(true);
      if ($suffix = Kohana::config('core.url_suffix')) {
        $request->url = substr($request->url, 0, strlen($request->url) - strlen($suffix));
      }

+     if ($method == "options") return;  // Allow CORS

      rest::set_active_user($request->access_key);

      $handler_class = "{$function}_rest";
      $handler_method = $request->method;
...
```
