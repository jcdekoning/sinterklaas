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
    })
    .Build();

host.Run();