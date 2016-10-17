#include <stdio.h>

#include "config.h"
#include "storage/pool.h"
#include "storage/node.h"

storage_pool *stpool;
server_config *srvcfg;

int main(int argc, char **argv){
  srvcfg = new server_config("./");
  stpool = new storage_pool("./", srvcfg);
  printf("Hello\n");
  return 0;
}
