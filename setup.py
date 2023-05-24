from setuptools import setup

package_name = 'l3xz_frontend'

setup(
    name=package_name,
    version='1.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    include_package_data=True,
    maintainer='Jonas Wuehr',
    maintainer_email='jonaswuehrmaintainer@gmail.com',
    description='Web interface for L3X-Z',
    license='MIT',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'l3xz_frontend = l3xz_frontend.run_webgui:main',
        ],
    },
)
