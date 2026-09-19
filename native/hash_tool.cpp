#include <iostream>
#include <string>
#include <sstream>
#include <iomanip>
#include <functional>
std::string stable_digest(const std::string& input){const auto value=std::hash<std::string>{}(input);std::ostringstream out;out<<std::hex<<value;return out.str();}
int main(int argc,char**argv){if(argc<2){std::cerr<<"usage: hash_tool <text>\n";return 2;}std::cout<<stable_digest(argv[1])<<"\n";return 0;}