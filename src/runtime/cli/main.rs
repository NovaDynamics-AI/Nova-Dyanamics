use clap::{App, Arg};
use nova_runtime::Runtime;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let matches = App::new("Nova Dynamics CLI")
        .version("1.0")
        .author("Nova Dynamics Team")
        .about("Command line interface for Nova Dynamics AI Engine")
        .arg(
            Arg::new("config")
                .short('c')
                .long("config")
                .value_name("FILE")
                .help("Sets a custom config file")
                .takes_value(true),
        )
        .get_matches();

    let config_path = matches.value_of("config").unwrap_or("config.json");
    let runtime = Runtime::new(config_path.into());
    
    runtime.start().await?;
    Ok(())
}
