using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sinterklaas.Api;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddLogging();
        services.AddOptions<ApiSettings>().Configure<IConfiguration>((settings, configuration) =>
        {
            configuration.Bind(settings);
        });
        services.AddSingleton((s) => {
            
            var configuration = s.GetRequiredService<IConfiguration>();
            var cosmosConnectionString = configuration.GetConnectionString("CosmosDBConnection");
            
            var cosmosClient = new CosmosClient(cosmosConnectionString);
            return cosmosClient;
        });
    })
    .Build();

host.Run();