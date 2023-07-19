
var builder = WebApplication.CreateBuilder(args);
 
var app = builder.Build();

app.MapGet("/", async (ctx) => {
    var parameters = new Dictionary<string, object?>();

    foreach (var param in ctx.Request.Query.Keys) {
        var value = ctx.Request.Query[param].First();
        Object? objValue = null;
        if (param == "cast_to_boolean") {
            objValue = bool.Parse(value);
        } else if (param == "cast_to_integer") {
            objValue = int.Parse(value);
        } else if (param == "cast_to_float") {
            objValue = float.Parse(value);
        } else if (param == "cast_to_date_time") {
            var date = new DateTime();
            date = DateTime.Parse(value);
            objValue = date.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
        } else {
            if (ctx.Request.Query[param].Count > 1) {
                objValue = ctx.Request.Query[param].ToArray();
            } else {
                objValue = value;
            }
        }

        parameters.Add(param, objValue);
    }

    await ctx.Response.WriteAsJsonAsync(parameters);
}
);

app.Run("http://127.0.0.1:1866");
