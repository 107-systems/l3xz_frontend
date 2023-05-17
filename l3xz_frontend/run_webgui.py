'''
This software is distributed under the terms of the MIT License.
Copyright (c) 2023 107-Systems
Author: Alexander Entinger / LXRobotics GmbH
'''

from http.server import HTTPServer, SimpleHTTPRequestHandler

def main(args=None):
    httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
    httpd.serve_forever()

if __name__ == '__main__':
    main()
